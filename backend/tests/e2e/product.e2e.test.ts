import request from "supertest";
import { AppDataSource } from "../../src/data-source";
import app from "../../src/app";

describe("Product E2E tests", () => {
  let server: any;

  //start the server
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await AppDataSource.initialize();
    server = app.listen(3001);
  });

  //close the server
  afterAll(async () => {
    await AppDataSource.destroy();
    server.close();
  });

  it("should return 200 for the root path", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
  });

  it("should create product for POST /api/products", async () => {
    const newProduct = {
        name: 'testing product', 
        description: 'testing product description',
        price: 99999,
    }
    //request
    const res = await request(server).post('/api/products').send(newProduct).expect(200); 

    //assertions
    expect(res.body).toBeDefined(); 
    expect(res.body.id).toBeDefined(); //id check
    expect(res.body.name).toEqual(newProduct.name); 
    expect(res.body.price).toEqual(newProduct.price); 
  })

  

});
