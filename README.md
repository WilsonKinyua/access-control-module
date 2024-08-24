## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

# Project Setup

This guide will help you set up and run both the backend and frontend of the project.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v20.16.0 or higher)
- pnpm (v9.7.1 or higher)
- MySQL (for the backend database)

## Backend Setup

### 1. Clone the Repository

```sh
git clone git@github.com:WilsonKinyua/access-control-module.git
```

### 2. Navigate to the Backend Directory

```sh
cd access-control-module/backend
```

### 3. Install Dependencies

```sh
pnpm install
```

### 4. Create a `.env` File inside the `backend` Directory

```sh
touch .env
```

or simply rename the `.env.example` file to `.env` and update the environment variables.

### 5. Update the `.env` File

Update the `.env` file with the following environment variables:

```sh
DB_PORT=3000
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

### 6. Run the Backend Server

```sh
pnpm start
```

## Frontend Setup

### 1. Navigate to the Frontend Directory (Root Directory)

```sh
cd ..
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Create a `.env` File inside the Root Directory

```sh
touch .env
```

or simply rename the `.env.example` file to `.env` and update the environment variables.

### 4. Update the `.env` File

Update the `.env` file with the following environment variables:

```sh
VITE_API_BASE_URL=http://localhost:{backend_port}
```

### 5. Run the Frontend Server

```sh
pnpm dev
```
Now you can open the frontend on the port it's running on.

### 6 Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### 7 Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### 8 Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```