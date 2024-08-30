#!/bin/bash

# Asegurate de que el usuario proporciona un mensaje de commit
if [ -z "$1" ]; then
  echo "Error: No commit message provided."
  echo "Usage: ./script.sh 'Your commit message'"
  exit 1
fi

# Proveer ./git.sh "Mi mensaje de commit"

# Añadir cambios al área de preparación
git add .

# (Opcional) Configuración local del usuario y correo, si no quieres modificar la configuración global
git config user.email "you@example.com"
git config user.name "Your Name"

# Realizar commit con el mensaje proporcionado
git commit -m "$1"

# Empujar cambios al repositorio remoto
git push

