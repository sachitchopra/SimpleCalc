<?php
  $username = 'root';
  $password = '';
  $database = 'numbers';

  $database = new mysqli('192.168.64.2:3306', $username, $password, $database) or die('Error connecting to server.');
  
  $calculation = $_POST['calculation'];
  $result = $_POST['result'];
  
  $order1 = "INSERT INTO numbers.Hist (Calculation, Result)
  VALUES ('$calculation', '$result')";
  $order2 = "SELECT * FROM numbers.Hist";
  
  $result1 = $database->query($order1);
  $result2 = $database->query($order2);
   
  if ($result1 == TRUE) {
    if($result2 == TRUE)
    {
        echo "Calculation: " . $calculation . " Result: " . $result;
    }
  } else {
    echo "$database->error";
  }
  
  $database->close();
?>