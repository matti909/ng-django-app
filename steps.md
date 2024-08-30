# Proceso de Despliegue

Este documento describe los pasos para el proceso de despliegue utilizando AWS y Docker.

## Pasos

1. Configurar AWS:
   ```
   aws configure
   ```

2. Crear el rol:
   ```
   make createRole
   ```

3. Crear el repositorio:
   ```
   make createRepo
   ```

4. Iniciar sesión en Amazon ECR:
   ```
   aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 533267189207.dkr.ecr.us-east-2.amazonaws.com
   ```

5. Construir la imagen Docker:
   ```
   docker build -t sample-repo .
   ```

6. Etiquetar la imagen:
   ```
   docker tag sample-repo:latest 533267189207.dkr.ecr.us-east-2.amazonaws.com/sample-repo:latest
   ```

7. Subir la imagen al repositorio:
   ```
   docker push 533267189207.dkr.ecr.us-east-2.amazonaws.com/sample-repo:latest
   ```

Nota: Este README será ampliado con más información en el futuro.