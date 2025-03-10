<?php
// This is a real file inclusion script that will actually include files
// WARNING: This is dangerous and only for testing threat detection
if(isset($_GET['file'])) {
    echo "<h1>File Inclusion</h1>";
    echo "<p>Including file: <strong>" . htmlspecialchars($_GET['file']) . "</strong></p>";
    
    echo "<div style='border: 1px solid #ccc; padding: 10px; margin: 10px 0; background: #f5f5f5;'>";
    echo "<h3>File Contents:</h3>";
    
    // This will actually attempt to include the specified file
    try {
        include($_GET['file']);
    } catch (Exception $e) {
        echo "<p style='color: red;'>Error including file: " . $e->getMessage() . "</p>";
    }
    
    echo "</div>";
} else {
    echo "<h1>File Inclusion</h1>";
    echo "<p>Enter a file path to include:</p>";
    echo "<form method='GET'>";
    echo "<input type='text' name='file' placeholder='Enter file path' style='width: 300px;'>";
    echo "<input type='submit' value='Include File'>";
    echo "</form>";
    
    echo "<h3>Try these paths:</h3>";
    echo "<ul>";
    echo "<li><a href='?file=/etc/passwd'>Include /etc/passwd</a></li>";
    echo "<li><a href='?file=../../../etc/hosts'>Include /etc/hosts</a></li>";
    echo "<li><a href='?file=index.php'>Include index.php</a></li>";
    echo "</ul>";
}
?>