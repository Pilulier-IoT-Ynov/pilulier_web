<?php
$data = json_decode(file_get_contents('php://input'), true);

$configContent = "const CONFIG = {\n";
$configContent .= "  deviceName: '" . $data['deviceName'] . "',\n";
$configContent .= "  serviceUUID: '" . $data['serviceUUID'] . "',\n";
$configContent .= "  characteristicUUID: '" . $data['characteristicUUID'] . "'\n";
$configContent .= "};\n";

file_put_contents('config.js', $configContent);
echo json_encode(['status' => 'success']);
?>
