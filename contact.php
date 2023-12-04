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
  $body = "<div><strong>Name:</strong> $name<br><strong>Email:</strong> $email<br><strong>Subject:</strong> $subject<br><br>$message</div>";

  $email_subject = "Omar Bin Abd Al-Azeez Private School";

  // Sending the email
  if (mail($recipient, $email_subject, $body, $emailheader)) {
    echo '<script>
    alert("Email Sent Successfully")
    window.location.replace("index-En");
    </script>';
  } else {
    echo '<script>
    alert("Sorry, Failed While Sending Mail!")
    window.location.replace("index-En");
    </script>';
  }
?>
