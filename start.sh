#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Lancement du backend..."
nohup node server.mjs > server.log 2>&1 &

sleep 1

echo "🌐 Lancement du frontend..."
npm run dev
