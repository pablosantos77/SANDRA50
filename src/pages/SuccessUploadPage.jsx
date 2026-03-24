# 1. Forzar la instalación de las librerías necesarias
npm install react-router-dom lucide-react

# 2. Añadir un cambio "invisible" en el código para que Vercel detecte algo nuevo
# (Esto añade una línea de comentario al final de tu App.jsx con la fecha de hoy)
echo "// Build update: $(date)" >> src/App.jsx

# 3. Guardar los cambios en Git
git add .
git commit -m "chore: forzando despliegue y actualizando dependencias"

# 4. Enviar los cambios a GitHub (esto es lo que activa a Vercel)
git push origin main
