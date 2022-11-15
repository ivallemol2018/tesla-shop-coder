# Backend Ecommerce - Proyecto final Programacion Backend Coderhouse

## Tecnologia Backend
- NodeJS - Version 14.16.0 o superior 
- express - Version 4.18.1
- express-session - Version 1.17.3
- passport - Version 0.6.0
- passport-local - Version 1.0.0
- bcryptjs - Version 2.4.3
- mongoose - Version 6.4.4
- log4js - Version 6.6.1
- socket.io - Version 4.5.3
- nodemailer - Version 6.7.8
- twilio - Version 3.82.0
- nodemon - Version 2.0.19
- concurrently - Version 7.2.2
- cloudinary - Version 1.32.0
- connect-mongo - Version 4.6.0
- formidable - Version 2.0.1
- jsonwebtoken - Version 8.5.1
- log4js - Version 6.6.1
- ejs - Version 3.1.8

## Tecnologia Frontend
- React - Version 18.2.0 o superior 
- react-hook-form - Version 7.39.1
- react-router-dom - Version 6.4.3
- react-slideshow-image - Version 4.0.5
- socket.io-client - Version 4.5.3
- swr - Version 4.5.3
- socket.io-client - Version 1.3.0
- universal-cookie - Version 4.0.4
- socket.io-client - Version 4.5.3
- @paypal/react-paypal-js - Version 7.8.1
- "@emotion/react" - Version 11.10.5
- "@emotion/styled" - Version 11.10.5
- "@mui/icons-material - Version 5.10.9
- "@mui/material - Version 5.10.12
- "@mui/x-data-grid - Version 5.17.10
- @uiball/loaders - Version 1.2.6
- axios - Version 1.1.3

## Instalacion
Esta app require [Node.js](https://nodejs.org/)

Instalar las dependencias del backend y frontend antes de iniciar el servidor

Backend, ubicarse en la raiz del proyecto
```sh
npm i
```

Frontend , ubicarse en  la carpeta "client"
```sh
npm i
```

Iniciar el proyecto, ubicarse en la raiz del proyecto
```sh
npm run dev
```
## El archivo de .dev en la carpeta config requiere

- HOST_DB_ECOMMERCE = 'Url MongoDB SAAS'  
- HOST_STMP = 'Servidor SMTP para el envio de email'  
- PORT_STMP = 'Puerto donde el servicio SMTP se esta ejecutando'
- USER_STMP = 'Usuario del servicio SMTP se esta ejecutando'
- PASSWORD_STMP = 'Password del servicio SMTP se esta ejecutando'
- JWT_SECRET_SEED = 'Una palabra secreta para el json web token'  
- TOKEN_TWILIO = 'token de twilio'
- PHONE_FROM_TWILIO = 'phone de twilio para el envio de mensajes'

## Para la simulacion del pago de la orden mediante paypal se necesita de las siguientes credenciales
- email = sb-vommk21916696@personal.example.com
- constraseña = Daniela10

## Inicializar la base de datos
Se ha expuesto una api para la inicializacion de la base
de datos 
```sh
Method POST  http://localhost:3000/api/seed
```
Al inicializar la base de datos se crea 2 cuentas predeterminadas
```sh
email : ivallemol@gmail.com
role  : admin

email : molina_valle@hotmail.com
role  : client
```

## Deploy

- El proyecto esta deployado en heroku 
https://tesla-shop-coder.herokuapp.com/