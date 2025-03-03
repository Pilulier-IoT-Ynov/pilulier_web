<!DOCTYPE html>
<html>
<head>
  <title>Modifier la configuration</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
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
  <script src="config_edit.js"></script>
</body>
</html>
