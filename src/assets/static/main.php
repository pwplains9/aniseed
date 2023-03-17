<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";

$arResult = [];
$arResult['success'] = true;

if ($arResult['success']) {
    $mail = new PHPMailer(true);

    $mail->CharSet = "UTF-8";
    $mail->IsHTML(true);


    $email = $_POST["email"];

    $message = $_POST["message"];
    $email_template = "template_mail.html";

    $body = file_get_contents($email_template);

    $body = str_replace('%email%', $email, $body);

    $body = str_replace('%message%', $message, $body);

    $mail->addAddress("hello@benemobile.agency");   // Здесь введите Email, куда отправлять
    $mail->setFrom($email);
    $mail->Subject = "[Заявка с формы]";
    $mail->MsgHTML($body);

    if (!$mail->send()) {
        $message = "Ошибка отправки";
    } else {
        $message = "Данные отправлены!";
    }

    $arResult = ["message" => $message];

    header('Content-type: application/json');

}

echo json_encode($arResult);
?>
