import request from 'supertest';
import server from './app'



// Had to skip this test because i had a problem with Supertest library
// this is the ideal test example for employee controller.

const API_PREFIX = '/api/v1';


describe.skip('Employees API', () => {
  let app

  beforeAll(async () => {
    app = await server
  })


  xtest(`  
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

  xtest(`  
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
