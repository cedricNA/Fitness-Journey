# Fitness-Journey

Ce projet contient une application mobile développée avec Expo et React Native.

## Prérequis

- **Node.js** \>= 18
- **npm** (fourni avec Node.js)
- **Expo CLI** : installez-le via `npm install -g expo`

## Installation

Les sources de l'application se trouvent dans le dossier `project`.

```bash
cd project
npm install
```

## Lancement en développement

```bash
npm run dev
```

Cette commande démarre Expo et permet de lancer l'application sur un simulateur ou un appareil réel.

## Structure du projet

- `app/` : écrans et routes de l'application
- `components/` : composants réutilisables
- `hooks/` : hooks personnalisés
- `assets/` : ressources statiques
- `app.json` : configuration Expo
- `package.json` et `tsconfig.json` : configuration globale

## Scripts utiles

- `npm run dev` : lance l'application en mode développement
- `npm run lint` : lance `expo lint` pour analyser le code
- `npm run build:web` : génère la version web dans `dist/`


