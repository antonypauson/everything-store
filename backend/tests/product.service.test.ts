import { ProductService } from "../src/services/product.service";
import { AppDataSource } from "../src/data-source";
import { Product } from "../src/entity/Product";

jest.mock("../src/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    }),
  },
}));

describe("Product Service", () => {
  let productService: any;
  let productRepository: any;

  beforeAll(() => {
    productService = new ProductService();
    productRepository = AppDataSource.getRepository(Product) as any;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(productService).toBeDefined();
  });

  it("should create a new product", async () => {
    const productData = {
      name: "Testing productData",
      description: "its my testing product",
      price: 3232323,
      stock: 100,
    };
    const resultData = {
      id: 1,
      ...productData,
    };

    (productRepository.create as jest.Mock).mockReturnValue(productData);
    (productRepository.save as jest.Mock).mockReturnValue(resultData);

    //what does this do?
    const result = await productService.createProduct(productData);

    //assertions
    //is the arguments of create and save correct?
    expect(productRepository.create).toHaveBeenCalledWith(productData);
    expect(productRepository.save).toHaveBeenCalledWith(productData);
    expect(result).toEqual(resultData);
  });
});
