const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { beforeAll, afterAll, describe, it, expect } = require('@jest/globals');

const Bike = require('../models/bike.model');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = require('../app');

/* Connecting to the database before each test. */
beforeAll(async () => {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  await mongoose.connect(DB, {
    useNewUrlParser: true
  });
  await Bike.deleteMany({});
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Admin iterraction with bikes', () => {
  const bikes = [
    {
      id: '5f3f7f3b1c9dc7a1',
      name: 'my cross bike',
      type: 'cross',
      wheelSize: 29,
      price: 999.99,
      color: 'red',
      description: 'testsdfsadfasdf'
    },
    {
      id: '5f3f7f3b1c9dc7a2',
      name: 'my sport bike',
      type: 'sport',
      wheelSize: 45,
      price: 1500,
      color: 'black',
      description: 'just a sport bike'
    },
    {
      id: '5f3f7f3b1c9dc7a3',
      name: 'trial bike',
      type: 'cross',
      wheelSize: 78,
      price: 2300,
      color: 'yellow',
      description: 'trial bike for trial lovers'
    }
  ];

  it('creates new bikes', async () => {
    const promises = bikes.map(bike =>
      request(app)
        .post('/api/v1/bikes')
        .send(bike)
        .expect(201)
    );

    return await Promise.all(promises);
  });

  it('gets all bikes', async () => {
    return await request(app)
      .get('/api/v1/bikes')
      .expect(200)
      .then(res => {
        expect(res.body.results).toBe(bikes.length);
      });
  });

  it('get one bike by id', async () => {
    return await request(app)
      .get(`/api/v1/bikes/${bikes[0].id}`)
      .expect(200);
  });

  it('throws an error trying to create bike with invalid body', async () => {
    return await request(app)
      .post('/api/v1/bikes')
      .send({
        id: '5f3f7f3b1c9d440000b1c7a1',
        name: 'my cross bike',
        type: 'cross',
        wheelSize: 29,
        price: 999.99
      })
      .expect(500);
  });

  it('update bike by id', async () => {
    return await request(app)
      .patch(`/api/v1/bikes/${bikes[0].id}`)
      .send({
        status: 'busy'
      })
      .expect(200)
      .then(res => {
        expect(res.body.data.status).toBe('busy');
      });
  });

  it('throws NotFound trying to update bike with invalid id', async () => {
    return await request(app)
      .patch('/api/v1/bikes/999')
      .send({
        name: 'this is bike'
      })
      .expect(404);
  });

  it('throws an error trying to update bike with invalid body', async () => {
    return await request(app)
      .patch(`/api/v1/bikes/${bikes[0].id}`)
      .send({
        status: 'sdfasfdsf'
      })
      .expect(500);
  });

  it('get bikes stats', async () => {
    return await request(app)
      .get('/api/v1/bikes/stats')
      .expect(200)
      .then(res => {
        expect(res.body.data.totalCount).toEqual(bikes.length);
        expect(res.body.data.availableCount).toEqual(2);
        expect(res.body.data.busyCount).toEqual(1);
        expect(res.body.data.averagePrice).toBeCloseTo(1600);
      });
  });

  it('deletes bike by id', async () => {
    return await request(app)
      .delete(`/api/v1/bikes/${bikes[0].id}`)
      .expect(200);
  });

  it('throws NotFound trying to delete bike with invalid id', async () => {
    return await request(app)
      .delete('/api/v1/bikes/999')
      .expect(404);
  });

  it('throws NotFound trying to access unknown route', async () => {
    return await request(app)
      .get('/api/v1/user/moto/sdfsdfadsf')
      .expect(404);
  });
});
