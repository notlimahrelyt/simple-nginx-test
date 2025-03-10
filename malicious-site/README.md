# Malicious Website for Palo Alto Threat Detection Testing

This is a test website designed to trigger Palo Alto Networks threat detection capabilities. It contains various simulated attack vectors but **NO ACTUAL MALICIOUS CODE** that would harm real systems.

## Contents

1. HTML-based attack patterns (XSS, CSRF, etc.)
2. JavaScript-based attack simulations
3. Path traversal simulations
4. SQL Injection patterns
5. Command injection patterns
6. EICAR test files for antivirus detection

## Usage

First, create a self-signed certificate:
```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./key.pem \
  -out ./cert.pem
```

Then run the Docker container:
```bash
docker-compose up -d
```

Visit the site at https://localhost and observe the Palo Alto threat detections.

## Testing URLs

The following URLs should trigger various threat detections:

- Basic attack vectors: `/`
- SQL Injection test: `/user/1' OR '1'='1`
- Command injection test: `/cmd/cat%20/etc/passwd`
- Path traversal test: `/include/../../../etc/passwd`
- Malware download test: `/download/malware.exe`
- EICAR test file: `/eicar.com`

## Warning

This is for security testing purposes only. Do not deploy this to a production environment.