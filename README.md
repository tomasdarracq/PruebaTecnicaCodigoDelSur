# PruebaTecnicaCodigoDelSur - Tomas Darracq

Este proyecto es una API REST desarrollada en Node.js + Express, cumpliendo los requisitos de la prueba técnica de CodigoDelSur.

<details>
<summary>Requisitos Técnicos</summary>

- Requisitos de usuario:
  - Registrar
  - Autenticar
- Requisitos de peliculas:
  - Obtener peliculas
  - Obtener peliculas por keyword
- Requisitos de favoritos:

  - Agregar favorito dado un movieId
  - Retornar favoritos de un usuario

- Node.js 20
- Express.js
- JWT para autenticación
- Archivo `.env`

- Endpoints implementados:
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/movies?keyword=opcional`
- `GET /api/favorites`
- `POST /api/favorites`
- Datos persistidos en archivos `.json` (`users.json`, `favorites.json`).
- Las contraseñas están encriptadas con bcrypt.

</details>

<details>
<summary>Como Ejecutar</summary>

```bash
# 1. Clonar el repo
git clone https://github.com/tomasdarracq/PruebaTecnicaCodigoDelSur.git
cd tu-repo

# 2. Instalar dependencias
npm install

# 4. Ejecutá en modo desarrollo
npm run dev


```
