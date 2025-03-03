<!DOCTYPE html>
<html>
<head>
  <title>Connexion Bluetooth avec ESP32</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="config.js"></script>
</head>
<body>
  <h1>Connexion Bluetooth avec ESP32</h1>
  <button id="connect">Se connecter à l'ESP32</button>
  <div id="status">Statut: Non connecté</div>
  
    <div class="timezone-select">
      <h3>Sélection de la timezone :</h3>
      <select id="timezone">
      <option value="UTC-12">UTC-12</option>
      <option value="UTC-11">UTC-11</option>
      <option value="UTC-10">UTC-10</option>
      <option value="UTC-9">UTC-9</option>
      <option value="UTC-8">UTC-8</option>
      <option value="UTC-7">UTC-7</option>
      <option value="UTC-6">UTC-6</option>
      <option value="UTC-5">UTC-5</option>
      <option value="UTC-4">UTC-4</option>
      <option value="UTC-3">UTC-3</option>
      <option value="UTC-2">UTC-2</option>
      <option value="UTC-1">UTC-1</option>
      <option value="UTC+0">UTC±0</option>
      <option value="UTC+1" selected>UTC+1</option>
      <option value="UTC+2">UTC+2</option>
      <option value="UTC+3">UTC+3</option>
      <option value="UTC+4">UTC+4</option>
      <option value="UTC+5">UTC+5</option>
      <option value="UTC+6">UTC+6</option>
      <option value="UTC+7">UTC+7</option>
      <option value="UTC+8">UTC+8</option>
      <option value="UTC+9">UTC+9</option>
      <option value="UTC+10">UTC+10</option>
      <option value="UTC+11">UTC+11</option>
      <option value="UTC+12">UTC+12</option>
      </select>
    </div>

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

  <script src="script.js"></script>
</body>
</html>