<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';
require 'phpMailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tour = htmlspecialchars($_POST["selected_tour"]);
    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);
    $date = htmlspecialchars($_POST["date"]);
    $people = htmlspecialchars($_POST["people"]);

    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'cyclistchat@gmail.com'; // Replace with your Gmail address
        $mail->Password = 'rmvs gkrg rmow lfcy'; // Replace with your Gmail App Password (never use regular password)
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Sender and recipient
        $mail->setFrom($email, $name);
        $mail->addAddress('cyclistchat@gmail.com'); // Your receiving email

        // Email subject and body
        $mail->Subject = 'New Tour Booking';
        $mail->Body =
            "Tour: $tour\n" .
            "Name: $name\n" .
            "Phone: $phone\n" .
            "Email: $email\n" .
            "Date: $date\n" .
            "People: $people\n\n" .
            "Message:\n$message";

        // Send the email
        $mail->send();
        header("Location: index.html?status=success");
        exit();
        
    } catch (Exception $e) {
   echo "<h3 style='color:red;'>❌ Booking failed:</h3><pre>{$mail->ErrorInfo}</pre>";
    }

} else {
    echo "⛔ Invalid request method.";
}
?>
