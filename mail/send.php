<?php

// Mail Settings

$host     = 'smtp.yourdomain.com'; // e.g. smtp.gmail.com
$username = 'your_username'; // e.g. yourname@gmail.com
$password = 'your_password'; // your password
$myName   = 'Your Name'; // your full name
$myEmail  = 'your@email.com'; // your e-mail address

// Most likely, you don't need to modify anything below

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {

	require 'class.phpmailer.php';
	
	$mail = new PHPMailer;
	
	$mail->IsSMTP();
	$mail->Host = $host;
	$mail->SMTPAuth = true;
	$mail->Username = $username;
	$mail->Password = $password;
	$mail->SMTPSecure = 'tls';
	
	$mail->SetFrom($myEmail, $myName);
	$mail->AddReplyTo($_POST['email'], $_POST['name']);
	$mail->AddAddress($myEmail, $myName);
	
	$mail->Subject = 'Message from ' . $_SERVER['SERVER_NAME'];
	$mail->Body = $_POST['message'] . "\r\n\r\n--------------------------------\r\nSent from " . $_SERVER['SERVER_NAME'];
	
	if (!$mail->Send()) {
	   echo 'Message could not be sent.';
	   echo 'Mailer Error: ' . $mail->ErrorInfo;
	   exit;
	}
	
	echo 'success';
	
}