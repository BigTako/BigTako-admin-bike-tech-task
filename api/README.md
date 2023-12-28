# Admin Bikes API 🏍

#### Techology Stack

[![BackEnd](https://skillicons.dev/icons?i=nodejs,express,mongodb,jest)](https://skillicons.dev)

_And also Postman for testing API._

# How to run:

> To run API , firstly clone my repository with API using `git clone https://github.com/BigTako/admin-bike-tech-task.git`. Then run `cd api`.
> Then install all neccessary packages using `npm install`.
> Next step, is to congirure database. My solution is using MongoDB, so you can create you own cluster in Atlas `https://www.mongodb.com/cloud/atlas/register` or crete in localy using Compass `https://www.mongodb.com/products/tools/compass`. Do not forget to grab url to your DB and password to it. When it's done, come into `api` folder again.
>
> Depending on what you want to do with solution, there is thee 'modes': `development`, `production` and `test`. If you are not going to use it in production right now, i'll have to create two new files in `api` directory of project: `.env.development` and `.env.test` I you want to deploy solution somewhere - create `.env.production`. Despite name, there wont be a lot of difference in these files. Common settings will look like that:

```
PORT = your_port(default is 3000)
DATABASE_PASSWORD=password_to_your_db
DATABASE=url_to_your_db
```

> For development and testing you will need two separate databases so create them and paste credentials into corresponding `.env` files.

### Testing

> To test an application just run `npm run test:e2e`. This will lauch whole application runtime test which includes interraction with routes.

### Launch

> Finally, if your are in development mode , launch app using `npm run start:dev`. That will launch `nodemon`, userful tool for automatical server reboot. In production run `npm run start:prod`, which will launch just node.

# Endpoints:

> [Bikes Module](#Bikes-Module)

# Bikes Module

### Get All Bikes

GET `http://127.0.0.1:3000/api/v1/bikes`

### Get Bikes Stats

GET `http://127.0.0.1:3000/api/v1/bikes/stats`

> Includes
>
> 1.  `totalCount` - total count of bikes
> 2.  `availableCount` - count of available bikes
> 3.  `busyCount` - count of busy bikes
> 4.  `averagePrice` - average bike price

### Get Bike by ID

GET`http://127.0.0.1:3000/api/v1/bike/:id`

Where id is bike_id

### Create Bike

POST`http://127.0.0.1:3000/api/v1/bikes

Body parameters:

```json
{
  "id": "unique_string",
  "name": "string",
  "type": "string",
  "color": "string",
  "price": "number",
  "wheelSize": "number",
  "description": "string"
}
```

### Update Bike

PATCH`http://127.0.0.1:3000/api/v1/bikes/:id`

Body parameters(all fields are optional):

```json
{
  "status": "available|busy|unavailable"
}
```

### Delete Bike(hard delete)

DELETE`http://127.0.0.1:3000/api/v1/bikes/:id`

> Made my `BigTako`
