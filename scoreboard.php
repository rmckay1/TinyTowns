<?php
session_start();
include 'db_connect.php';


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Game Over</title>
</head>
<body>
    GAME OVER!
      <h1>The Javascript value is...</h1>
      <p style="text-align: center; font-size: 400%; color: #f00">
      <?php 
        $brdStr = $_POST['brdStr']; 
        $startTime = $_POST['startTime']; 
        echo $brdStr;
        echo $startTime;


        // To insert into the Games table, you would say

        // $uid = run query and fetch first value
        $username = $_SESSION['user'];
        $query = "SELECT id FROM Users WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $uid = $result->fetch_assoc()['id'] ?? null;

        $query = "INSERT INTO Games (user_id, score, board, start_time) VALUES (?, -1, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("iss", $uid, $brdStr, $startTime);
        $stmt->execute();


      ?>
      </p>
</body>
</html>