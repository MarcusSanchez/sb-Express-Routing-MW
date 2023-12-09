const request = require('supertest');
const { app, server } = require('../main.js');

afterAll(() => {
  server.close();
});

describe('GET /items', () => {
  it('should get all items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body.items).toEqual(items);
  });
});

describe('POST /items', () => {
  it('should add a new item', async () => {
    const newItem = { name: 'New Item', price: 10 };
    const response = await request(app)
      .post('/items')
      .send(newItem);

    expect(response.status).toBe(201);
    expect(response.body.added).toEqual(newItem);
  });

  it('should handle missing name or price', async () => {
    const response = await request(app).post('/items').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name and price are required');
  });
});

describe('GET /items/:name', () => {
  it('should get a specific item by name', async () => {
    const item = { name: 'item', price: "$1.45" };
    items.push(item);

    const response = await request(app).get(`/items/${item.name}`);
    expect(response.status).toBe(200);
    expect(response.body.item).toEqual(items[0]);
  });

  it('should handle not finding the item', async () => {
    const response = await request(app).get('/items/nonexistent-item');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Item not found');
  });
});

describe('PATCH /items/:name', () => {
  it('should update a specific item by name', async () => {
    const item = { name: 'item', price: "$1.45" };
    items.push(item);

    const updatedItem = { price: 20 };
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send(updatedItem);

    expect(response.status).toBe(200);
    expect(response.body.updated).toEqual({ ...items[0], price: 20 });
  });

  it('should handle not finding the item', async () => {
    const response = await request(app).patch('/items/nonexistent-item').send({});
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Item not found');
  });
});

describe('DELETE /items/:name', () => {
  it('should delete a specific item by name', async () => {
    let item = { name: 'item', price: "$1.45" };
    items.push(item);

    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.status).toBe(200);
    expect(response.body.item).toBe(item.name);
    expect(response.body.status).toBe('deleted');
  });

  it('should handle not finding the item', async () => {
    const response = await request(app).delete('/items/nonexistent-item');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Item not found');
  });
});