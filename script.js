let bluetoothDevice;
let gattServer;
let service;
let characteristic;

const statusElement = document.getElementById('status');

function updateStatus(message) {
  statusElement.textContent = `Statut: ${message}`;
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
  
  // Récupération de la timezone
  const timezone = document.getElementById('timezone').value;
  
  // Création de l'objet final
  const data = {
    timezone: timezone,
    schedule: schedule
  };
  
  // Affichage du JSON
  const jsonOutput = document.getElementById('jsonOutput');
  jsonOutput.textContent = JSON.stringify(data, null, 2);

  // Envoi via Bluetooth
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));
  
  try {
    await characteristic.writeValue(encodedData);
    alert('Données envoyées');
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données', error);
  }
});
