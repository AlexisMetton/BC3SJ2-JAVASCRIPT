const request = require('supertest');
const express = require('express');
const session = require('express-session');
const db = require('./../services/database');
const authRoutes = require('../router/auth');

const app = express();
app.use(express.json());
app.use(session({ secret: 'testsecret', resave: false, saveUninitialized: true }));
app.use('/api', authRoutes);

describe('Tests API Auth', () => {
  let testUser = {
    nom: "Test",
    prenom: "User",
    email: "test@example.com",
    mot_de_passe: "password123"
  };

  let agent = request.agent(app);

  // Réinitialisation de la base avant chaque test
  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      db.query('DELETE FROM utilisateurs', (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });

  // Test de l'inscription
  test('Inscription d\'un nouvel utilisateur', async () => {
    const res = await agent.post('/api/register').send(testUser);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Utilisateur inscrit avec succès');
  });

  // Test de la connexion
  test('Connexion avec l\'utilisateur inscrit', async () => {
    await agent.post('/api/register').send(testUser); // 🔄 Créer l'utilisateur avant le test
    const res = await agent.post('/api/login').send({
      email: testUser.email,
      mot_de_passe: testUser.mot_de_passe
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Connexion réussie');
  });

  // Vérification de l'authentification
  test('Vérification si l\'utilisateur est authentifié', async () => {
    await agent.post('/api/register').send(testUser);
    await agent.post('/api/login').send({
      email: testUser.email,
      mot_de_passe: testUser.mot_de_passe
    });
    const res = await agent.get('/api/isAuthenticated');
    expect(res.status).toBe(200);
    expect(res.body.authenticated).toBe(true);
  });

  // Test de la déconnexion
  test('Déconnexion de l\'utilisateur', async () => {
    await agent.post('/api/register').send(testUser);
    await agent.post('/api/login').send({
      email: testUser.email,
      mot_de_passe: testUser.mot_de_passe
    });
    const res = await agent.post('/api/logout');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Déconnexion réussie');
  });

  // Nettoyage après chaque test
  afterEach(async () => {
    await new Promise((resolve, reject) => {
      db.query('DELETE FROM utilisateurs', (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });
});
