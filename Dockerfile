#Descarga la imagen node para instalar angular
FROM node:alpine

WORKDIR /app

# Instala nodejs y npm
RUN apk add nodejs npm
RUN npm install -g @angular/cli


# Para la verisón definitiva copia los ficheros de la aplicación en la imagen
# COPY ./html /var/www/html

CMD ["npm" ,"start"]

# Abre el puerto
EXPOSE 4200
