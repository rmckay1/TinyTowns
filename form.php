<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION["username"] = $_POST["username"];
    $_SESSION["email"] = $_POST["email"];
    
    header("Location: TinyTowns.html");
    exit();
}
header("Location: form.html");
exit();
?>