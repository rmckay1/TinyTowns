<?php
session_start();

include 'db_connect.php';

$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $user = $_POST['username'];
  $pass = $_POST['password'];
  $stmt = $conn->prepare('SELECT hashpass FROM Users WHERE username=?');
  $stmt->bind_param('s', $user);
  $stmt->execute();
  $stmt->store_result();
  if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashpass);
    $stmt->fetch();
    if (password_verify($pass, $hashpass)) {
      $message = 'Login successful.';
      $_SESSION['user'] = $user;
      header('Location: TinyTowns.php');
      exit();
    } else {
      $message = 'Invalid login.';
    }
  }
  
  $stmt->close();
  $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tinytowns Login</title>
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
        <button type="submit">Login</button>
      </form>
      <div><a href="register.php">Register</a></div>
    </div>
  </div>
</body>

</html>