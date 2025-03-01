# Description

Bazar-Campechano is a modern, full-stack eCommerce application template designed to jumpstart the development of online stores with efficiency and ease. Built on the robust foundations of Next.js, React, and Prisma, it offers a seamless development experience with out-of-the-box support for responsive layouts, dynamic routing, and server-side rendering, ensuring fast, scalable, and SEO-friendly web applications.

# Development

Steps to start the app in development

1. Rename the .env.example to .env
2. Replace the enviroment variables
3. Execute the command:

```
npm install
```

4. Set up the db

```
docker-compose up -d
```

5. Execute these prisma commands:

```
npx prisma migrate dev; npx prisma generate
```

6. Execute SEED

```
npm run seed
```

# Populate Attributes and Value Options

7. Execute migration of stock

```
npm run seed:attributes
npm run seed:migrate-stock
```

Shortcut command:

```
npm run seed;npm run seed:attributes;npm run seed:migrate-stock
```

9. Run server with command:

```
npm run dev
```

# Notes: default user

Default user data in the seed file

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
