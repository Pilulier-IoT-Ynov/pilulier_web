let bluetoothDevice;
let gattServer;
let service;
let characteristic;

const statusElement = document.getElementById('status');

function updateStatus(message) {
  statusElement.textContent = `Statut: ${message}`;
}

async function verifyConnection() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) {
    updateStatus('Non connecté');
    return false;
  }
  try {
    const testService = await gattServer.getPrimaryService(CONFIG.serviceUUID);
    const testCharacteristic = await testService.getCharacteristic(CONFIG.characteristicUUID);
    await testCharacteristic.readValue();
    updateStatus('Connecté à l\'ESP32');
    return true;
  } catch (error) {
    updateStatus('Erreur de connexion');
    console.error('Erreur de connexion', error);
    return false;
  }
}

async function listBluetoothDevices() {
  try {
    const devices = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [CONFIG.serviceUUID]
    });
    console.log('Appareils Bluetooth disponibles:', devices);
    alert(`Appareils Bluetooth disponibles: ${devices.name}`);
  } catch (error) {
    console.error('Erreur lors de la recherche des appareils Bluetooth', error);
    alert('Erreur lors de la recherche des appareils Bluetooth');
  }
}

function disconnectBluetooth() {
  if (bluetoothDevice && bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.disconnect();
    updateStatus('Déconnecté');
    alert('Déconnecté de l\'ESP32');
  } else {
    alert('Aucun appareil connecté');
  }
}

// Gestionnaire de connexion Bluetooth (identique)
document.getElementById('connect').addEventListener('click', async () => {
  updateStatus('En attente de connexion...');
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ name: CONFIG.deviceName }],
      optionalServices: [CONFIG.serviceUUID]
    });
    gattServer = await bluetoothDevice.gatt.connect();
    service = await gattServer.getPrimaryService(CONFIG.serviceUUID);
    characteristic = await service.getCharacteristic(CONFIG.characteristicUUID);
    updateStatus('Connecté à l\'ESP32');
  } catch (error) {
    updateStatus('Erreur de connexion');
    console.error('Erreur de connexion', error);
  }
});

// Gestionnaire de sélection des jours
document.querySelectorAll('.day-item').forEach(item => {
  item.addEventListener('click', (e) => {
    // Ne pas déclencher si on clique sur un input ou un bouton
    if (!e.target.classList.contains('time-input') && !e.target.classList.contains('add-time')) {
      item.classList.toggle('selected');
      const timeInputs = item.querySelector('.time-inputs');
      timeInputs.classList.toggle('visible', item.classList.contains('selected'));
    }
  });
});

// Gestionnaire d'ajout d'horaires
document.querySelectorAll('.add-time').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const timeInputs = e.target.parentElement;
    const newInput = document.createElement('input');
    newInput.type = 'time';
    newInput.className = 'time-input';
    timeInputs.insertBefore(newInput, e.target);
  });
});

// Gestionnaire d'envoi du formulaire
document.getElementById('scheduleForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // Récupération des données
  const schedule = {};
  document.querySelectorAll('.day-item.selected').forEach(dayItem => {
    const day = dayItem.dataset.day;
    const times = Array.from(dayItem.querySelectorAll('.time-input'))
                      .map(input => input.value)
                      .filter(time => time !== '');
    if (times.length > 0) {
      schedule[day] = times;
    }
  });

  
  // Création de l'objet final
  const currentTime = new Date().toISOString();
  const [date, time] = currentTime.split('T');
  const [year, month, day] = date.split('-');
  const [hours, minutes, seconds] = time.split(':');
  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const currentDay = daysOfWeek[new Date().getDay()];
  const data = {
    currentDay: currentDay,
    datetime: currentTime,
    monday: schedule['Lundi'],    
    tuesday: schedule['Mardi'],
    wednesday: schedule['Mercredi'],
    thursday: schedule['Jeudi'],
    friday: schedule['Vendredi'],
    saturday: schedule['Samedi'],
    sunday: schedule['Dimanche'],
    date: [year, month, day, hours, minutes, seconds.split('.')[0]],
    schedule: schedule
  };
  
  // Affichage du JSON
  const jsonOutput = document.getElementById('jsonOutput');
  jsonOutput.textContent = JSON.stringify(data, null, 2);

  // Envoi via Bluetooth
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  if (!await verifyConnection()) {
    return;
  }

  try {
    await characteristic.writeValue(encodedData);
    alert('Données envoyées');
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données', error);
  }
});

document.getElementById('syncTime').addEventListener('click', async () => {
  if (!await verifyConnection()) {
    return;
  }

  const currentTime = new Date().toISOString();
  const jsonOutput = document.getElementById('jsonOutput');
  jsonOutput.textContent = JSON.stringify(currentTime, null, 2);
  const encoder = new TextEncoder();
  const encodedTime = encoder.encode(JSON.stringify({ currentTime }));

  try {
    await characteristic.writeValue(encodedTime);
    alert(`Heure synchronisée: ${currentTime}`);
  } catch (error) {
    console.error('Erreur lors de la synchronisation de l\'heure', error);
    alert('Erreur lors de la synchronisation de l\'heure');
  }
});

// Ajouter un bouton pour lister les appareils Bluetooth disponibles
document.getElementById('listDevices').addEventListener('click', listBluetoothDevices);

// Ajouter un bouton pour déconnecter le Bluetooth
document.getElementById('disconnect').addEventListener('click', () => {
  disconnectBluetooth();
  const jsonOutput = document.getElementById('jsonOutput');
  const currentTime = new Date().toISOString();
  jsonOutput.textContent = JSON.stringify(currentTime, null, 2);
});
