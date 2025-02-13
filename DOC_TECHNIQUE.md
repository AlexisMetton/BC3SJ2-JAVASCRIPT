**Documentation Technique**

# **1. Architecture de l'application**

## **1.1 Technologies Utilisées**
- **Frontend** : React.js avec React Router et TailwindCSS
- **Backend** : Express.js (Node.js)
- **Base de Données** : MySQL avec `mysql2`
- **Authentification** : Sessions avec `express-session` et `bcrypt` pour le hashage des mots de passe
- **Tests** : Jest/Supertest pour le backend, Cypress pour le frontend

## **1.2 Architecture Générale**
L'application suit une architecture **MVC (Modèle-Vue-Contrôleur)** :
- **Modèle** : Base de données MySQL
- **Vue** : Interface utilisateur React.js
- **Contrôleur** : Routes et logique métier dans Express.js

### **Flux de l'authentification**
1. **Inscription** : L'utilisateur remplit un formulaire et ses informations sont stockées en base de données avec un mot de passe hashé.
2. **Connexion** : L'utilisateur entre son email et mot de passe. Si les identifiants sont corrects, une session est créée.
3. **Accès au profil** : Seuls les utilisateurs connectés peuvent voir et modifier leur profil.
4. **Déconnexion** : La session est supprimée et l'utilisateur est redirigé vers la page de connexion.

## **1.3 Base de Données**
### **Tables Principales**
#### `utilisateurs`
| id  | nom   | prenom | email  | mot_de_passe | roles       |
|-----|-------|--------|--------|-------------|------------|
| INT | TEXT  | TEXT   | UNIQUE | TEXT        | TEXT (ex: ["utilisateur"]) |

#### `livres`
| id  | titre | auteur | date_publication | isbn   | statut       |
|-----|-------|--------|------------------|--------|-------------|
| INT | TEXT  | TEXT   | DATE             | STRING | ENUM("disponible", "emprunté") |


---

# **2. Rapport de Tests**

## **2.1 Tests Backend (Jest & Supertest)**
**Tests réalisés :**
- ✅ **Inscription** : Vérifie que l’utilisateur est bien ajouté en base de données.
- ✅ **Connexion** : Vérifie qu’un utilisateur peut se connecter avec des identifiants valides.
- ✅ **Vérification d’authentification** : Teste si un utilisateur est bien connecté.
- ✅ **Accès et modification du profil** : Un utilisateur peut accéder à son profil et le modifier.
- ✅ **Déconnexion** : Teste que la session est bien supprimée.

### **Problèmes rencontrés et solutions**
| Problème | Solution |
|----------|----------|
| La base de données de test se pollue avec des utilisateurs créés en boucle | Ajout d’un `beforeEach` pour nettoyer la table `utilisateurs` avant chaque test |
| Timeout dans Jest car les requêtes SQL étaient lentes | Augmentation du `timeout` et utilisation de `async/await` |
| L’utilisateur de test était réellement ajouté à la base en production | Création d’une base `library_test` spécifique aux tests |

## **2.2 Tests Frontend (Cypress)**
**Tests réalisés :**
- ✅ **Affichage du formulaire d’inscription et soumission valide**
- ✅ **Connexion réussie avec redirection vers le profil**

### **Problèmes rencontrés et solutions**
| Problème | Solution |
|----------|----------|
| Cypress ne pouvait pas visiter `/register` | Vérification du bon démarrage du serveur avant les tests |

---

**Conclusion**
L’application est robuste et fonctionne comme prévu après la mise en place de ces tests. Les sessions sont bien gérées et l’authentification sécurisée. Cypress assure que l’expérience utilisateur reste fluide et fonctionnelle après chaque mise à jour.

