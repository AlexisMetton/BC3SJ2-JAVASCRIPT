require('dotenv').config(); // Charger les variables d'environnement

const mysql = require('mysql2');

const databaseName = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_NAME : process.env.DB_NAME;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: databaseName
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données:', err.message);
        return;
    }
    console.log(`✅ Connecté à la base de données: ${databaseName}`);
});

module.exports = db;
