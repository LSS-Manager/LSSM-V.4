<?php
function webhook ($webhook_body, $url) {
    $webhook_curl = curl_init();
    curl_setopt_array($webhook_curl, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $webhook_body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type:application/json',
        ]
    ]);
    $webhook_response = curl_exec($webhook_curl);
    curl_close($webhook_curl);
    return $webhook_response;
}
