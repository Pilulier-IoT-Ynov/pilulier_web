<!DOCTYPE html>
<html>
<head>
  <title>Connexion Bluetooth avec ESP32</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="config.js"></script>
</head>
<body>
  <h1>Connexion Bluetooth avec ESP32</h1>
  <a href="#" id="openConfig">Modifier la configuration</a><br><br>
  <button id="connect">Se connecter à l'ESP32</button>
  <button id="disconnect">Déconnecter</button>
  <button id="syncTime">Synchroniser l'heure</button>
  <button id="listDevices">Lister les appareils Bluetooth disponibles</button>
  <div id="status">Statut: Non connecté</div>

  <form id="scheduleForm">
    <div class="schedule-table">
      <h3>Sélection des jours et horaires :</h3>
      <div class="days-grid">
        <div class="day-item" data-day="Lundi">
          <div>Lundi</div>
          <div class="time-inputs">
            <input type="time" class="time-input">
            <button type="button" class="add-time">+</button>
          </div>
        </div>
        <div class="day-item" data-day="Mardi">
          <div>Mardi</div>
          <div class="time-inputs">
            <input type="time" class="time-input">
            <button type="button" class="add-time">+</button>
          </div>
        </div>
        <div class="day-item" data-day="Mercredi">
          <div>Mercredi</div>
          <div class="time-inputs">
            <input type="time" class="time-input">
            <button type="button" class="add-time">+</button>
          </div>
        </div>
        <div class="day-item" data-day="Jeudi">
          <div>Jeudi</div>
          <div class="time-inputs">
            <input type="time" class="time-input">
            <button type="button" class="add-time">+</button>
          </div>
        </div>
        <div class="day-item" data-day="Vendredi">
          <div>Vendredi</div>
          <div class="time-inputs">
            <input type="time" class="time-input">
            <button type="button" class="add-time">+</button>
          </div>
        </div>
        <div class="day-item" data-day="Samedi">
          <div>Samedi</div>
          <div class="time-inputs">
            <input type="time" class="time-input">
            <button type="button" class="add-time">+</button>
          </div>
        </div>
        <div class="day-item" data-day="Dimanche">
          <div>Dimanche</div>
          <div class="time-inputs">
            <input type="time" class="time-input">
            <button type="button" class="add-time">+</button>
          </div>
        </div>
      </div>
    </div>
    
    <br>
    <button type="submit">Envoyer</button>
  </form>

  <pre id="jsonOutput"></pre>

  <div id="configPopup" class="popup">
    <div class="popup-content">
      <span class="close">&times;</span>
      <h1>Modifier la configuration</h1>
      <pre id="currentConfig"></pre>
      <form id="configForm">
        <label for="deviceName">Nom de l'appareil:</label>
        <input type="text" id="deviceName" name="deviceName"><br><br>
        <label for="serviceUUID">Service UUID:</label>
        <input type="text" id="serviceUUID" name="serviceUUID"><br><br>
        <label for="characteristicUUID">Characteristic UUID:</label>
        <input type="text" id="characteristicUUID" name="characteristicUUID"><br><br>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </div>

  <script src="script.js"></script>
  <script src="config_edit.js"></script>
</body>
</html>