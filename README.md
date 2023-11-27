# Next.js OpenJira App
para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
* -d means __detached__

* MongoDB URL Local
```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__a__.env__

* Reconstruir los modulos de node y levantar Next
```
yarn install
yarn dev
```

## Llenar la base de datos con informacion de pruebas

Llamara:
```
http://localhost:3000/api/seed
```