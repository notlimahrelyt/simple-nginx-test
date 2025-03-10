# Simple NGINX Test with Docker-Compose

> **DISCLAIMER: This is for testing and development purposes only. NOT FOR PRODUCTION USE.**

This is a very simple NGINX web server using Docker with a self-signed certificate. The idea behind this repo was a very quick and portable way to test out load balancing on Ubuntu Server instances.

For native instructions without using Docker, please see the [Native System Install](#native-system-install) section at the bottom of this README.

## Prerequisites
- [Install Docker and Docker Compose](#installing-docker-and-docker-compose)
- [Clone the repo](#cloning-the-repo)
- [Generate a Self Signed SSL Certificate](#generating-self-signed-ssl-certificates)
- [Using the Containers](#using-the-containers)

If you prefer not to use Docker, see the [Native System Install](#native-system-install) section.

### Installing Docker and Docker Compose
Official Docker documentation: [Instructions](https://docs.docker.com/engine/install/ubuntu/)

Before running this project, you'll need to install Docker and Docker Compose on your system.

1. Run the following command to uninstall all conflicting packages.
```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```
2. Add Docker's official GPG key:
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```
3. Add the repository to Apt sources
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
4. Install Docker Engine, containerd, and Docker Compose
```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
5. Add your user to the docker group to run Docker without sudo
```bash
sudo usermod -aG docker $USER
```
6. Log out and log back in for this to take effect
```bash
exit
```

7. Verify Docker Compose installation:
```bash
docker compose version
```

### Verify Docker Installation

To verify that Docker is installed correctly, run:
```bash
docker --version
docker compose --version
```

## Cloning the Repo

```bash
git clone https://github.com/notlimahrelyt/simple-nginx-test.git
cd simple-nginx-test
```

## Generating Self Signed SSL Certificates

Make sure you're in the project directory before generating certificates:

### 1. Create a Self-Signed Certificate
```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./key.pem \
  -out ./cert.pem
```

When prompted, enter appropriate information for your self-signed certificate. For the "Common Name" field, it's best to use your server's IP address or domain name that you'll be using to access the site, rather than "localhost".

## Using the Containers
### 1. Start the Web Server
```bash
docker compose up -d
```

Note: Both `docker-compose` and `docker compose` commands may work depending on your Docker version. The newer `docker compose` syntax (with a space) is recommended.

This command will:
- Pull the NGINX Docker image if it's not already available locally
- Create and start the container with the configuration specified in the docker-compose.yml file
- Run the container in detached mode (-d flag) so it runs in the background

### 2. Access the Website
- HTTP (redirects to HTTPS): http://SERVER_IP
- HTTPS: https://SERVER_IP

Replace `SERVER_IP` with the actual IP address of your Ubuntu Server.

For example:
- HTTP: http://192.168.1.100 or http://ec2-xxx-xxx-xxx-xxx.compute-1.amazonaws.com
- HTTPS: https://192.168.1.100 or https://ec2-xxx-xxx-xxx-xxx.compute-1.amazonaws.com

Note: Since you're using a self-signed certificate, your browser will show a security warning. This is expected and can be bypassed for local testing. In most browsers, you can proceed by clicking "Advanced" and then "Proceed to site (unsafe)".

### 3. Stop the Web Server
```bash
docker compose down
```

## Project Structure
- `docker-compose.yml`: Defines the NGINX service configuration
- `nginx.conf`: NGINX server configuration with SSL settings
- `index.html`: Simple web page served by NGINX
- `key.pem` & `cert.pem`: SSL certificate files (generated by you)

## Troubleshooting
- If ports 80 or 443 are already in use, modify the port mappings in the docker-compose.yml file.
- Ensure that Docker is running before executing Docker commands.
- If you encounter permission issues creating the certificates, try running the commands without sudo.
- If you see "Permission denied" errors when running Docker commands, make sure you've properly added your user to the docker group and have logged out and back in.

# Native System Install

If you prefer not to use Docker, you can install NGINX directly on your Ubuntu Server. This approach may be simpler for users who are not familiar with containers:

1. **Install NGINX**:
   ```bash
   sudo apt update
   sudo apt install -y nginx
   ```

2. **Generate a Self-Signed Certificate**:
   ```bash
   sudo mkdir -p /etc/nginx/ssl
   
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout /etc/nginx/ssl/key.pem \
     -out /etc/nginx/ssl/cert.pem
   ```
   
   When prompted for the "Common Name", enter your server's IP address or domain name, not "localhost".

3. **Configure NGINX**:
   Create a new site configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/example
   ```
   
   Paste the following configuration:
```
   server { 
       listen                  443 ssl;
       listen                  [::]:443 ssl;
       server_name             YOUR_SERVER_IP;   # Replace with your server's IP or domain
       ssl_certificate         /etc/nginx/ssl/cert.pem;
       ssl_certificate_key     /etc/nginx/ssl/key.pem;

       root /var/www/html;
       index index.html;

       location / {
         try_files $uri $uri/ =404;
       }
   }
   server {
       listen 80;
       listen [::]:80;

       server_name             YOUR_SERVER_IP;   # Replace with your server's IP or domain

       return 302 https://$server_name$request_uri;
   }
```

**Note**: Be sure to replace `YOUR_SERVER_IP` with your actual server IP address or domain name in both server blocks.

4. **Create a Symbolic Link to Enable the Site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/example /etc/nginx/sites-enabled/
   ```

5. **Copy the Website Content**:
   ```bash
   # Copy index.html to the web root
   sudo cp /path/to/simple-nginx-test/index.html /var/www/html/
   ```
   Note: Replace `/path/to/simple-nginx-test` with the actual path to where you cloned the repository.

6. **Test NGINX Configuration**:
   ```bash
   sudo nginx -t
   ```

7. **Restart NGINX**:
   ```bash
   sudo systemctl restart nginx
   ```

8. **Access the Website**:
   - HTTP (redirects to HTTPS): http://SERVER_IP
   - HTTPS: https://SERVER_IP

   Replace `SERVER_IP` with the actual IP address of your Ubuntu Server (e.g., 192.168.1.100 or ec2-xxx-xxx-xxx-xxx.compute-1.amazonaws.com).

9. **Control NGINX Service**:
   ```bash
   # Stop NGINX
   sudo systemctl stop nginx
   
   # Start NGINX
   sudo systemctl start nginx
   
   # Check status
   sudo systemctl status nginx
   ```

## Troubleshooting Native Installation (Ubuntu Server)

- **Port conflicts**: If ports 80 or 443 are already in use, you may need to change them in the NGINX configuration.
- **Permission issues**: Make sure you have proper permissions to write to the configuration directories.
- **Certificate errors**: Ensure the paths to your SSL certificates are correct in the NGINX configuration.
- **Service doesn't start**: Check the NGINX error logs for more information:
  ```bash
  sudo journalctl -u nginx.service
  # or
  sudo cat /var/log/nginx/error.log
  ```
- **Default site conflict**: If the default NGINX site is interfering, disable it:
  ```bash
  sudo rm /etc/nginx/sites-enabled/default
  sudo systemctl reload nginx
  ```
