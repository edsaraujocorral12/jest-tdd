import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
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
});
