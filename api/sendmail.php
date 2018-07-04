<?php

header('Content-Type: application/json');

const _fromMail = 'kontakt@martawilczynska.pl';

$rawdata = file_get_contents('php://input');
$data = json_decode($rawdata, true);

if (isset($data['message']) && isset($data['subject']) && isset($data['phone']) && isset($data['name']) && isset($data['email'])) {
    $emailMessage = 'Imie i Nazwisko: ' . $data['name'] . "\n";
    $emailMessage .= 'Numer telefonu: ' . $data['phone'] . "\n";
    $emailMessage .= 'E-mail: ' . $data['email'] . "\n\n";
    $emailMessage .= 'Temat: ' . $data['subject'] . "\n";
    $emailMessage .= wordwrap($data['message'], 70);

    $headers = 'From: ' . _fromMail . "\r\n";
    $headers .= 'Replay-To: ' . $data['email'] . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    if(mail('Marta Wilczynska-Staniul <marta.wilczynska@onet.eu>', $data['subject'], $emailMessage, $headers)) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(400);
}