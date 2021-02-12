#Descarga la imagen node para instalar angular
FROM node:alpine

WORKDIR /app

# Instala nodejs y npm
RUN apk add nodejs npm &&\
    npm install -g @angular/cli

CMD ["npm" ,"start"]

# Abre el puerto
EXPOSE 4200
