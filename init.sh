#!/bin/bash

echo "\n******* Creando los contenedores..."
docker-compose up -d
sleep 10s
echo "\n******* Iniciando la aplicación..."
sleep 10s
echo "\n******* Un poquito de paciencia , gracias..."
sleep 10s

echo ""
echo "      ╔════════════════════╗"
echo "      ║                    ║"
echo "      ║  APLICACIÓN LISTA  ║"
echo "      ║                    ║"
echo "      ╚════════════════════╝"
echo ""
echo "Puede acceder a la aplicación desde su navegador en la ruta:  http://carshare.client.local"
echo "\nSi la aplicación no funciona compruebe su fichero hosts y agrege la linea:\n127.0.0.1   carshare.client.local"
echo "Para Windows: C:\Windows\System32\drivers\etc\hosts"
echo "Para Linux: /etc/hosts"
echo "Para Mac: /private/etc/hosts"
echo "\n"
