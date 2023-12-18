<?php
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Set the email header for HTML content
$emailheader =  "Content-Type: text/html; charset=UTF-8\r\n";
$emailheader .= "From: $name <$email>\r\n"; // English terms are commonly used in email headers

$recipient = "abd.alrahman.olabi@gmail.com"; // Company Email (That Will Receive The Mail)

// Create the body of the email with right-to-left direction
$body = "<div dir='rtl'><strong>الاسم:</strong> $name<br><strong>البريد الإلكتروني:</strong> $email<br><strong>الموضوع:</strong> $subject<br><br>$message</div>";

$email_subject = "مدرسة عمر بن عبد العزيز الخاصة";

// Sending the email
if (mail($recipient, $email_subject, $body, $emailheader)) {
  echo '<script>
    alert("تم إرسال البريد الإلكتروني بنجاح")
    window.location.replace("index");
    </script>';
} else {
  echo '<script>
    alert("!عذرًا، فشل أثناء إرسال البريد")
    window.location.replace("index");
    </script>';
}
