<?php

$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $user = $_POST['username'];
  $pass = $_POST['password'];

  $servername = 'db';
  $username = 'root';
  $password = 'root';
  $dbname = 'tinytowns';
  $conn = new mysqli($servername, $username, $password, $dbname);
  
  if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
  }
  $userExistsStmt = $conn->prepare('SELECT * FROM Users WHERE username=?');
  $userExistsStmt->bind_param('s', $user);
  $userExistsStmt->execute();
  $userExistsStmt->store_result();
  if ($userExistsStmt->num_rows > 0) {
    $message = 'Username already exists.';
  } else {
    $hash = password_hash($pass, PASSWORD_DEFAULT);
    $stmt = $conn->prepare('INSERT INTO Users VALUES (?, ?)');
    $stmt->bind_param('ss', $user, $hash);
    if ($stmt->execute()) {
      $message = 'Account created successfully.';
      header('Location: form.php');
      exit();
    } else {
      $message = 'Error: ' . $stmt->error;
    }
    $stmt->close();
  }
  $userExistsStmt->close();
  $conn->close();  
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration</title>
</head>
<body>
  <div>
    <?php if ($message): ?>
      <div><?php echo $message; ?></div>
    <?php endif; ?>
  </div>
  <div class="container">
    <div class="login-box">
      <form action="" method="POST">
        <input type="text" id="username" name="username" required placeholder="Username">
        <input type="password" id="password" name="password" required placeholder="Password">
        <button type="submit">Create</button>
      </form>
      <div><a href="form.php">I have an account.</a></div>
    </div>
  </div>
</body>
</html>