import request from 'supertest';
import server from './app'


const API_PREFIX = '/api/v1';


describe('Employees API', () => {
  let app

  beforeAll(async () => {
    app = await server
  })


  it(`  
        GIVEN i am checking success scenario
        WHEN fetching get employees
        THEN API should return success
    `, async () => {
    const url = `${API_PREFIX}/employees`
    const response = await request(app.getHttpServer()).get(url);
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.error).toBeFalsy();
  });

  it(`  
        GIVEN i am checking success scenario
        WHEN fetching countries
        THEN API should return success
    `, async () => {
    const url = `/countries`
    const response = await request(app.getHttpServer()).get(url);
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.error).toBeFalsy();
  });
});
