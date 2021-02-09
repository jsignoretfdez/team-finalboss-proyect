<h1 align="center">Bienvenido a NodepopV2 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> Nodepop es una Api que nos sirve un listado de anuncios de segunda manos para la compra o la venta de artículos. Esta montado sobre una Base de datos de MongoDB. La app nos permite crear anuncios, borrarlos y filtrarlos por varios criterios introducidos en la url.

## Clonar el repositorio

```sh
git clone https://github.com/jsignoretfdez/Practica-node-avanzado.git
```

## Instalación

```sh
npm install
```

## Configuración Archivo .env

```sh
cp .env.example .env
```
> Una vez se ha copiado el contenido y creado el fichero .env le ponemos el nombre de la Base de datos que vamos a crear.

## Inicializar Base de datos de prueba

```sh
npm run initDB
```

> Este comando nos va a permitir crear una base de datos de prueba con las colecciones creadas a modo de ejemplo.

**⚠️ Atención este script borra la base de datos solo debe utilizarse en el primer despligue de la aplicación**

## Iniciar la APP

```sh
npm run start
```

> Este script inicializa pm2 ecosystem.config.js y la app.

### Metodos API

## Login JWT

POST /api/authenticate

> Desde Postman hacemos una petición http y en el body recogemos el email y el pass.
> Si ponemos un email y pass valido nos devolverá un token.

![Imagen Login](https://drive.google.com/uc?export=view&id=1-goXh0T0mG3YpGMOZ57GBq7U3v39apw9)

## Lista Agentes

GET /api/anuncios

> Requiere un Token valido
> El Token lo tenemos que poner en headers{Authotize: Token valido al loguearnos}
> Si es correcto el token nos va a responder con un JSON de los anuncios

{
        "tags": [
            "work"
        ],
        "_id": "5fa80b27fcbeaf5fc32695f8",
        "nombre": "Otro",
        "precio": 12,
        "venta": true,
        "foto": "1604848423668_detalle3.png",
        "thumbnail": "images/thumbnail/Thumb_1604848423668_detalle3.png",
        "__v": 0
    }

## Crear Anuncio

POST /api/anuncios/upload

> Requiere un Token valido
> El Token lo tenemos que poner en headers{Authotize: Token valido al loguearnos}
> En el body debemos poner lo siguiente (La imagen debemos seleccionarla como file).

![Imagen Anuncio Creado](https://drive.google.com/uc?export=view&id=1cMNZHU_k5RlaT3djMPWgW4_EOl38W3MR)

> Si todo ha salido correctamente nos mandara un json.

{
    "tags": [
        "work, funny"
    ],
    "_id": "5fa812598b43cd68cb51c16b",
    "nombre": "Ps5",
    "precio": 400,
    "venta": true,
    "foto": "1604850265905_detalle3.png",
    "thumbnail": "images/thumbnail/Thumb_1604850265905_detalle3.png",
    "__v": 0
}

## Borrar Anuncio

DELETE /:_id

> Requiere un Token valido

{
    "status": "Ok",
    "resultado": "Anuncio Borrado Correctamente",
    "id": "5f5cea35079e4ddbab3eeefd"
}

## Lista de Tags

GET /api/anuncios/tags

> Requiere un Token valido

{
  "tagsPermitidos": "work / funny / sport / house / lifestyle / gaming"
}

## Ejemplos de Filtros

[comment]: # (Filtro Tags)
* http://localhost:3000/api/anuncios?token=token_valido&tags=work%20funny

[comment]: # (Filtro Precio)
* http://localhost:3000/api/anuncios?token=token_valido&precio=80-190

[comment]: # (Filtro Nombre)

* http://localhost:3000/api/anuncios?token=token_valido&nombre=n

[comment]: # (Filtro Orden Descendente)

* http://localhost:3000/api/anuncios?token=token_valido&sort=-precio

[comment]: # (Filtro Paginación)

* http://localhost:3000/api/anuncios?token=token_valido&limit=2&skip=1

[comment]: # (Filtro Varios)

* http://localhost:3000/api/anuncios?token=token_valido&limit=2&venta=true&precio=60-&tags=sports&nombre=G


## Author

👤 **Jose Manuel Signoret Fernández**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
