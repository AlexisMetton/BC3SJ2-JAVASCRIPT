# Guide d'installation

## Installation en local

### Initialiser le projet

1. Verifier la présence de Node.js et NPM
```shell
node -v
npm -v
```


2. installer les dépendances
```shell
npm i
```
```shell 
cd client
npm i
cd  ..
```

2. Importer le script SQL dans votre base de donnée
```shell
    mysql -u [username] -p [database_name] < ./config/library.sql
```
Un mot de passe vous sera alors demandé, dans le cas ou aucun mot de passe n'es configuré sur votre base, vous pouvez retirer le `-p`
Par exemple pour un utilisateur root sans mot de passe avec une base de donnée library:
```shell
    mysql -u root library < ./config/library.sql
```


### Lancer le projet

1. Exécuter le serveur et le client en mode developpeur
```shell
    npm run dev
```

Celle ci lance en parrallèle :
-> L'application React avec Vite en mode développement
-> L'API Express avec nodemon ( rechargement automatique du serveur à chaque modification )

2. Accéder à l'Application
Ouvrez votre navigateur et allez sur la page http://localhost:5174 pour l'application et http://localhost:3000 pour l'api.


3. Connexion
Connectez vous à l'aide d'un des comptes via la page Connexion
**Rôle Admin :**
```
john@smith.com
azerty
```

OU
**Rôle utilisateur :**
```
marc@lord.com 
azerty
```

## Lancement en production

Une version "Production" est réalisable avec la commande : 
```shell
    npm run start
```
Celle-ci construira automatiquement l'application react-vite et lancera le serveur


## TroubleShot

#### L'application serveur m'affiche une erreur ressource en mode developpement 
Si l'erreur : Error: ENOENT: no such file or directory, stat '..../webpub/index.html' , s'affiche en mode développement dans votre terminal, cela n'es pas génant et provient du fait que vous n'avez pas de version buildé encore disponible pouvant être servi par Express

#### L'application ne se lance bien
 => Verifier bien que vous avez installer les dépendances côté serveur et côté client

#### Page Blanche en mode developpement
Pensez bien à aller sur le lien react en mode developpement : http://localhost:5173/

#### Mes modifications côté client ne s'affiche pas
Si vous avez déjà réalisé un build ou une commande production attention à ne pas vous connecter sur le client fournit par Express, l'adresse en mode developpement pour le front-end est http://localhost:5173/