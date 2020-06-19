import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import User from '../../src/app/models/User';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Edson',
        email: 'edsaraujocorral12@gmail.com',
        password_hash: '1231123',
      });
    expect(response.body).toHaveProperty('id');
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Edson',
      email: 'edsaraujocorral12@gmail.com',
      password: '1231123',
    });

    const compareHash = await bcrypt.compare('1231123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('shoud not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Edson',
        email: 'edsaraujocorral12@gmail.com',
        password_hash: '1231123',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Edson',
        email: 'edsaraujocorral12@gmail.com',
        password_hash: '1231123',
      });
    expect(response.status).toBe(400);
  });
});
