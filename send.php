<?php
$botToken = "ТВОЙ_ТОКЕН_БОТА"; 
$chatId = "ТВОЙ_ID_ЧАТА";

error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
$phone = isset($_POST['phone']) ? trim(htmlspecialchars($_POST['phone'])) : '';
$message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'])) : '';

if (empty($name) || empty($phone)) {
    echo json_encode(["status" => "error", "message" => "Required fields are empty"]);
    exit;
}

$text = "🔔 NEW LEAD!\n\n";
$text .= "Name: " . $name . "\n";
$text .= "Phone: " . $phone . "\n";

if (!empty($message)) {
    $text .= "Message: " . $message . "\n";
}

$url = "https://api.telegram.org/bot" . $botToken . "/sendMessage";
$postFields = [
    'chat_id' => $chatId,
    'text' => $text
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
