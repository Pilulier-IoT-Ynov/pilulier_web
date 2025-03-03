# Connexion Bluetooth avec ESP32

Ce projet permet de se connecter à un ESP32 via Bluetooth et de configurer un emploi du temps pour envoyer des données à l'ESP32.

## Fonctionnalités

- Connexion Bluetooth avec un ESP32
- Sélection des jours et des horaires
- Sélection de la timezone
- Envoi des données configurées à l'ESP32

## Comment utiliser le site

1. **Connexion Bluetooth**: Cliquez sur le bouton "Se connecter à l'ESP32" pour établir une connexion Bluetooth avec votre ESP32. Assurez-vous que votre ESP32 est allumé et à portée.

2. **Sélection de la timezone**: Utilisez le menu déroulant pour sélectionner votre timezone.

3. **Configuration de l'emploi du temps**:
   - Cliquez sur les jours de la semaine pour les sélectionner.
   - Pour chaque jour sélectionné, ajoutez les horaires en utilisant les champs de saisie de temps et le bouton "+".

4. **Envoi des données**:
   - Cliquez sur le bouton "Envoyer" pour envoyer les données configurées à l'ESP32.
   - Les données seront affichées en format JSON dans la section "JSON Output".

## Configuration Bluetooth

Pour que la connexion Bluetooth fonctionne, vous devez mettre à jour les informations suivantes dans le fichier `index.php` :

- **Nom de l'appareil ESP32**: Remplacez `'YourESP32DeviceName'` par le nom de votre appareil ESP32.
- **UUID du service**: Remplacez `'your-service-uuid'` par l'UUID du service de votre ESP32.
- **UUID de la caractéristique**: Remplacez `'your-characteristic-uuid'` par l'UUID de la caractéristique de votre ESP32.

## Exemple de données JSON envoyées

```json
{
  "timezone": "UTC+1",
  "schedule": {
    "Lundi": ["08:00", "12:00"],
    "Mardi": ["09:00", "13:00"]
  }
}
```

## Dépendances

- Un navigateur compatible avec l'API Web Bluetooth (par exemple, Google Chrome)
- Un ESP32 avec le Bluetooth activé et configuré pour accepter les connexions
````