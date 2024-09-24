<?php
    if (!error_get_last()) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];        
        $title = 'New request from the site WithLoveFromJulie';
        $body = "
            <h2>New request from the site:</h2>
            <b>Name:</b> $name<br>
            <b>Email:</b> $email<br>
            <b>Message:</b><br>$message
        ";
        $to = 'chao@enrickbui.com';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: WithLoveFromJulie" . "\r\n";

        if (mail($to, $title, $body, $headers)) {
            $data['result'] = "success";
            $data['info'] = "Message sent successfully!";
        } else {
            $data['result'] = "error";
            $data['info'] = "The message was not sent.";
        }
    } else {
        $data['result'] = "error";
        $data['info'] = "There is an error in the code";
        $data['desc'] = error_get_last();
    }
    header('Content-Type: application/json');
    echo json_encode($data);
?>
