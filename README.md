# Simple NGINX Test with Docker-Compose
This is a very simple NGINX web server using Docker with a self-signed certificate. The idea behind this repo was a very quick and portable way to test out load balancing.

### Create a Self Signed Certificate
```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./key.pem \
  -out ./cert.pem
```