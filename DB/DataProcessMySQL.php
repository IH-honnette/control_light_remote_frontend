<?php
include_once "DatabaseManager.php";

class DataProcessMySQL extends DatabaseManager{
    private $WEATHER_TBL = "";
    public function __construct($tbl="data"){
        $this->WEATHER_TBL = $tbl;
        #Start by creating a table in the database if it doesn't exist yet.
        $sql = "CREATE TABLE IF NOT EXISTS ".$this->WEATHER_TBL." (
            id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
            device varchar(10) NOT NULL,
            status varchar(10) NOT NULL);";
        $q = parent::__construct()->prepare($sql);
        $q->execute();
    }

    public function getTimestamp($offsetParam){
        #Offset is the number of hours counted from GMT.
        $offsetToSeconds=$offsetParam*60*60; #converting offset to seconds
        $dateFormat="Y-m-d H:i:s";
        return gmdate($dateFormat, time()+$offsetToSeconds);
    } 

    public function insertData($device,$status){
        $sql ="UPDATE data set status = :status where device =:device";
        print($sql);
        $q = parent::__construct()->prepare($sql);
        $q->bindValue(":device", $device); 
        $q->bindValue(":status", $status);
        print $device;
        if($q->execute()){
            print "Success";
        }
        else{
            print "Failure";
        }
    }
    public function readData(){
        $sql ="SELECT * FROM data WHERE device = '1';";
        $q = parent::__construct()->prepare($sql);
        $q->execute();
        return $q;
    } 

    public function getData(){
        $status;
        $device;
        foreach($this->readData()->fetchAll() as $row):
            if(!empty($row)){
                $device = $row["device"];
                $status = $row["status"];
            }
        endforeach;    
        $data = array("status" => $status,"device" => $device);
        return json_encode($data);
    }

}
?>
