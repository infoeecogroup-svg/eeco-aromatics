# 🚀 EECO AROMATICS — GitHub & Contabo VPS Deployment Guide

This guide details how to push your code to **GitHub** and deploy both the **Main Store** and **Admin Panel (Separately Isolated)** on a **Contabo Ubuntu VPS**.

---

## 📦 PART 1: Push Project to GitHub

Open **PowerShell** or **Terminal** in your project folder (`c:\Users\Manuka\Documents\sellzy-preview-v1\EECO-SL`):

```bash
# 1. Initialize Git Repository (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit the changes
git commit -m "Initial commit - EECO Aromatics Full Store & Isolated Admin CMS"

# 4. Rename default branch to main
git branch -M main

# 5. Connect to your GitHub repository (Replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/eeco-sl.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🖥️ PART 2: Setup Contabo VPS (Ubuntu 22.04 / 24.04)

### Step 1: Connect to your Contabo VPS via SSH
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Update System & Install Required Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx ufw
```

### Step 3: Install Node.js (v20 LTS) & PM2
```bash
# Install Node.js v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 Process Manager globally
sudo npm install -g pm2
```

---

## 🚀 PART 3: Clone & Build Project on Contabo VPS

### Step 1: Clone Repository into `/var/www/eeco-store`
```bash
sudo mkdir -p /var/www
cd /var/www
git clone https://github.com/YOUR_USERNAME/eeco-sl.git eeco-store
cd eeco-store
```

### Step 2: Install Dependencies & Build Next.js Production Bundle
```bash
npm install
npm run build
```

### Step 3: Start Application with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🌐 PART 4: Configure Nginx for Separate Domain / Subdomain Routing

This setup ensures:
1. `yourdomain.com` (Main Web Store) **blocks `/admin` completely from normal users**.
2. `admin.yourdomain.com` (Isolated Admin Subdomain) routes **directly and securely to the Admin Panel**.

### Step 1: Copy and Edit Nginx Config
```bash
sudo cp /var/www/eeco-store/nginx-eeco.conf /etc/nginx/sites-available/eeco.conf
```

Open `/etc/nginx/sites-available/eeco.conf` and replace `yourdomain.com` with your actual domain name:
```bash
sudo nano /etc/nginx/sites-available/eeco.conf
```

### Step 2: Enable the Site & Restart Nginx
```bash
sudo ln -s /etc/nginx/sites-available/eeco.conf /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 PART 5: Free SSL Certificate (HTTPS) via Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d admin.yourdomain.com
```

Certbot will automatically install SSL certificates and set up auto-renewal!

---

## 🔄 Future Updates (How to Deploy New Code)

Whenever you push updates to GitHub:
```bash
ssh root@YOUR_SERVER_IP
cd /var/www/eeco-store
git pull origin main
npm install
npm run build
pm2 restart eeco-store
```
