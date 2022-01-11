'use strict';

const server = require('../app.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Testing my HTTP server', () => {

  it('Should be able to send respond to POST to /message', async () => {
    let res = await request.post('/message?text=test&author=test');

    expect(res.status).toEqual(200);
    expect(res.body[0].text).toEqual('test');
  });
});