<?php

header('Content-Type: application/json');

require_once('./_utils/fill_template.php');

const _fromMail = 'kontakt@martawilczynska.pl';

$rawdata = file_get_contents('php://input');
$data = json_decode($rawdata, true);
$mailingList = 'Marta Wilczyńska-Staniul <marta.wilczynska@onet.eu>';

if (isset($data['message']) && isset($data['subject']) && isset($data['phone']) && isset($data['name']) && isset($data['email'])) {
    $data['message'] = htmlspecialchars($data['message']);
    $data['subject'] = htmlspecialchars($data['subject']);
    $data['phone'] = htmlspecialchars($data['phone']);
    $data['name'] = htmlspecialchars($data['name']);
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        die();
    }

    $headers = 'From: ' . _fromMail . "\r\n";
    $headers .= "Replay-To: " . $data['email'] . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();
    $headers .= "Content-Type: html/text; charset=utf-8\r\n";

    $emailTemplate = file_get_contents('./_utils/email_template.html');
    $templateData = ['name' => $data['name'], 'email' => $data['email'], 'phone' => $data['phone'], 'subject' => $data['subject'], 'message' => $data['message']];
    $emailMessage = fill_template($templateData, $emailTemplate);

    if(mail($mailingList, $data['subject'], $emailMessage, $headers)) {
        http_response_code(200);
        die();
    } else {
        http_response_code(500);
        die();
    }
} else {
    http_response_code(400);
    die();
}