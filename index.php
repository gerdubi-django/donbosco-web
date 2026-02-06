<?php

declare(strict_types=1);

$uriPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$normalizedPath = '/' . trim($uriPath, '/');
$normalizedPath = $normalizedPath === '/' ? '/' : rtrim($normalizedPath, '/');

// This router centralizes public and private entry points behind a single index.php.
switch ($normalizedPath) {
    case '/':
    case '/landing':
        header('Content-Type: text/html; charset=UTF-8');
        readfile(__DIR__ . '/web/index.html');
        exit;

    case '/ingresos':
    case '/ingresos/login':
    case '/sistema-ingresos':
        require __DIR__ . '/ingresos/php/views/view_control.php';
        exit;

    default:
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        echo '<h1>404 - Page not found</h1>';
        exit;
}
