require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const db = require('./../services/database')
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || 'supersecretkey';

// Middleware pour gérer les sessions
router.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettre à true en production avec HTTPS
}));

// Inscription
router.post('/register', async (req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body;
    const roles = JSON.stringify(["utilisateur"]);

    db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], async (err, results) => {
        if (results.length > 0) return res.status(400).json({ message: 'Email déjà utilisé' });

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        db.query('INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, roles) VALUES (?, ?, ?, ?, ?)',
            [nom, prenom, email, hashedPassword, roles],
            (err) => {
                if (err) return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
                res.json({ message: 'Utilisateur inscrit avec succès' });
            });
    });
});

// Connexion
router.post('/login', (req, res) => {
    const { email, mot_de_passe } = req.body;
    
    db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], async (err, results) => {
        if (results.length === 0) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        
        if (!isPasswordValid) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        
        let userRoles;

        userRoles = JSON.parse(user.roles);
        
        req.session.user = { id: user.id, roles: userRoles };
                
        res.json({ message: 'Connexion réussie' });
    });
});

// Middleware d'authentification
const authenticate = (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ message: 'Non authentifié' });
    next();
};

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
    if (!req.session.user || !req.session.user.roles.includes("admin")) {
        return res.status(403).json({ message: 'Accès refusé, vous devez être administrateur' });
    }
    next();
};

const canEditProfile = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Non authentifié' });
    }
    const userId = parseInt(req.params.id, 10);
    if (req.session.user.roles.includes("admin") || req.session.user.id === userId) {
        return next();
    }
    return res.status(403).json({ message: 'Accès refusé, vous ne pouvez modifier que votre propre profil.' });
};

// Profil utilisateur
router.get('/profile/:id', authenticate, (req, res) => {
    db.query('SELECT id, nom, prenom, email, roles FROM utilisateurs WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (results.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.json(results[0]);
    });
});

// Mise à jour du profil
router.put('/profile/:id', authenticate, canEditProfile, (req, res) => {
    const { nom, prenom } = req.body;
    db.query('UPDATE utilisateurs SET nom = ?, prenom = ? WHERE id = ?',
        [nom, prenom, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
            res.json({ message: 'Profil mis à jour' });
        });
});

// Statistiques
router.get('/stats', (req, res) => {
    db.query('SELECT COUNT(*) AS total FROM utilisateurs', (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        res.json({ total: results[0].total });
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        res.json({ message: 'Déconnexion réussie' });
    });
});

// Vérifier si connecté
router.get('/isAuthenticated', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router;
