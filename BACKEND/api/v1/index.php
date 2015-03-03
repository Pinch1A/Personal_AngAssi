<?php
header ('X-Testing: x-assignar');

require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';


\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();



$app->get('/products', function() { 
    global $db;
    $rows = $db->select("assignar","id,name,description,creation,updated",array());
    echoResponse(200, $rows);
});

$app->post('/products', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("assignar", $data, $mandatory);
    $rows["message"] = "Asset added successfully.";
    echoResponse(200, $rows);
});

$app->put('/products/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("assignar", $data, $condition, $mandatory);
        $rows["message"] = "Asset information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/products/:id', function($id) { 
    global $db;
    $rows = $db->delete("assignar", array('id'=>$id));
        $rows["message"] = "Asset removed successfully.";
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
