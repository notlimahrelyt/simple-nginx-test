<?php
// This is a static file to trigger detection - PHP isn't actually executing
// File inclusion backdoor pattern
if(isset($_GET['file'])) {
    include($_GET['file']);
}
?>

<h1>File Inclusion Simulation</h1>
<p>File included: <?php echo htmlspecialchars($_GET['file']); ?></p>
<pre>
# /etc/passwd content simulation
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
</pre>