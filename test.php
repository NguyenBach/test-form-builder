<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
function save($fileName, $data)
{
    $fileName .= '.json';
    file_put_contents($fileName, json_encode($data));
    return true;
}

function get($filename)
{
    $filename .= '.json';
    $data = file_get_contents($filename);
    return json_decode($data, true);
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'POST') {
    $filename = $_POST['form_id'];
    $data = $_POST['form_data'];
    save($filename, $data);
    echo json_encode([
        'code' => 200,
        'message' => 'success'
    ]);
}

if ($method == 'GET') {
    $filename = $_GET['form_id'];
    $data = get($filename);
    echo json_encode([
        'code' => 200,
        'message' => 'success',
        'data' => json_decode($data)
    ]);
}