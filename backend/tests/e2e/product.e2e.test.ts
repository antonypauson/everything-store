import request from "supertest";
import { AppDataSource } from "../../src/data-source";
import app from "../../src/app";
import { Product } from "../../src/entity/Product";

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

  //make sure we clear everything before
  // each test
  beforeEach(async () => {
    await AppDataSource.synchronize(true);
  });

  it("should return 200 for the root path", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
  });

  it("should create product for POST /api/products", async () => {
    const newProduct = {
      name: "testing product",
      description: "testing product description",
      price: 99999,
    };
    //request
    const res = await request(server)
      .post("/api/products")
      .send(newProduct)
      .expect(200);

    //assertions
    expect(res.body).toBeDefined();
    expect(res.body.id).toBeDefined(); //id check
    expect(res.body.name).toEqual(newProduct.name);
    expect(res.body.price).toEqual(newProduct.price);
  });

  it("should return empty array if no products", async () => {
    const res = await request(server).get("/api/products").expect(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toEqual(0);
  });

  it("should return all products", async () => {
    const placeholderProducts = [
      { name: "test pro 1", price: 100 },
      { name: "test pro 2", price: 100 },
      { name: "test pro 3", price: 100 },
    ];
    await Promise.all(
      placeholderProducts
        .map((product) => request(server).post("/api/products")
        .send(product)
        .expect(200))
    );

    //get
    const res = await request(server).get("/api/products").expect(200); 

    expect(res.body).toBeInstanceOf(Array); 
    expect(res.body.length).toEqual(placeholderProducts.length);
    expect(res.body).toEqual(
        expect.arrayContaining(
            placeholderProducts.map((product) => 
                expect.objectContaining({
                    id: expect.any(Number), 
                    name: product.name,
                    price: product.price, 
                    description: expect.any(String),
                    stock: expect.any(Number)
                }))
        )
    ) 
  });
});
