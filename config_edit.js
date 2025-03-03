document.getElementById('openConfig').addEventListener('click', async (event) => {
    event.preventDefault();
    const popup = document.getElementById('configPopup');
    popup.style.display = 'block';

    try {
        const response = await fetch('config.js');
        const configText = await response.text();
        const config = JSON.parse(configText.replace('const CONFIG = ', '').replace(';', ''));

        document.getElementById('deviceName').value = config.deviceName;
        document.getElementById('serviceUUID').value = config.serviceUUID;
        document.getElementById('characteristicUUID').value = config.characteristicUUID;

        document.getElementById('currentConfig').textContent = JSON.stringify(config, null, 2);
    } catch (error) {
        console.error('Erreur lors du chargement de la configuration', error);
    }
});

document.getElementById('viewConfig').addEventListener('click', async () => {
    try {
        const response = await fetch('config.js');
        const configText = await response.text();
        const config = JSON.parse(configText.replace('const CONFIG = ', '').replace(';', ''));

        document.getElementById('currentConfig').textContent = JSON.stringify(config, null, 2);
    } catch (error) {
        console.error('Erreur lors du chargement de la configuration', error);
    }
});

document.querySelector('.close').addEventListener('click', () => {
    const popup = document.getElementById('configPopup');
    popup.style.display = 'none';
});

document.getElementById('configForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const deviceName = document.getElementById('deviceName').value;
    const serviceUUID = document.getElementById('serviceUUID').value;
    const characteristicUUID = document.getElementById('characteristicUUID').value;

    const config = {
        deviceName: deviceName,
        serviceUUID: serviceUUID,
        characteristicUUID: characteristicUUID
    };

    try {
        await fetch('save_config.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        });
        alert('Configuration enregistrée');
        const popup = document.getElementById('configPopup');
        popup.style.display = 'none';
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la configuration', error);
        alert('Erreur lors de l\'enregistrement de la configuration');
    }
});
