<?php
header("Content-Type: application/json");

include_once("DataProcessMySQL.php");

    if(!empty($_REQUEST["device"])){
        $obj = new DataProcessMySQL();
        $obj->insertData(
            $_REQUEST["device"], 
            $_REQUEST["status"]
            );
    }
 
    $API = new DataProcessMySQL();

    echo $API->getData();

?>