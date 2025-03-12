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
        $jsval = $_POST['jsval']; 
        echo $jsval;

        // To insert into the Games table, you would say

        // $uid = run query and fetch first value
        // SELECT id FROM Users WHERE username='name'

        // INSERT INTO Games (user_id, score, board, start_time)
        // VALUES ($uid, -1, 'boardstate', mystarttime)


      ?>
      </p>
</body>
</html>