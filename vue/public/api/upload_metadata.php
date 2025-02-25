<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Получаем данные из тела запроса
    $jsonData = file_get_contents('php://input');
    if (!$jsonData) {
        throw new Exception('No input data received');
    }

    $data = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg());
    }

    // Проверяем наличие необходимых полей
    if (!isset($data['genId']) || !isset($data['metadata'])) {
        throw new Exception('Missing required fields');
    }

    $genId = $data['genId'];
    $metadata = $data['metadata'];

    // Set upload directory path
    $uploadDir = __DIR__ . '/../uploads/metadata';
    
    if (!is_dir($uploadDir)) {
        throw new Exception('Metadata directory does not exist. Please create it first.');
    }

    if (!is_writable($uploadDir)) {
        throw new Exception('Metadata directory is not writable');
    }

    // Формируем путь к файлу
    $filename = $uploadDir . '/' . $genId . '_metadata.json';
    
    // Debug info
    error_log('Saving metadata to: ' . $filename);

    // Сохраняем метаданные в файл
    $jsonContent = json_encode($metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    
    if ($jsonContent === false) {
        throw new Exception('Failed to encode metadata: ' . json_last_error_msg());
    }

    if (file_put_contents($filename, $jsonContent) === false) {
        throw new Exception('Failed to write metadata file: ' . error_get_last()['message']);
    }

    // Verify file was created
    if (!file_exists($filename)) {
        throw new Exception('Metadata file was not created');
    }

    error_log('Metadata file created successfully at: ' . $filename);

    // Construct metadata URL
    $baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    $metadataUrl = $baseUrl . '/uploads/metadata/' . $genId . '_metadata.json';

    echo json_encode([
        'success' => true,
        'message' => 'Metadata uploaded successfully',
        'url' => $metadataUrl
    ]);

} catch (Exception $e) {
    error_log('Metadata upload error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
} 