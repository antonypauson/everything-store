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

    const result = await productService.createProduct(productData);

    //assertions
    //is the arguments of create and save correct?
    expect(productRepository.create).toHaveBeenCalledWith(productData);
    expect(productRepository.save).toHaveBeenCalledWith(productData);
    expect(result).toEqual(resultData);
  });

  it ('should get all products', async () => {
    const allProducts: Product[] = [
      {
        id: 1,
        name: "Testing product Data",
        description: "its my testing product",
        price: 3232323,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Testing product Data",
        description: "its my testing product",
        price: 3232323,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    //returns
    (productRepository.find as jest.Mock).mockResolvedValue(allProducts); 

    const result = await productService.getAllProducts(); 

    //assertion
    expect(productRepository.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(allProducts); 
  })

  it ('should get product', async () => {
    const allProducts: Product[] = [
      {
        id: 1,
        name: "Testing product Data",
        description: "its my testing product",
        price: 3232323,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Testing product Data",
        description: "its my testing product",
        price: 3232323,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const productId = 1; 

    //return
    (productRepository.findOneBy as jest.Mock).mockResolvedValue(allProducts.find(product => product.id === productId)); 

    const result = await productService.getProductById(productId); 

    //assertions
    expect(productRepository.findOneBy).toHaveBeenCalledWith({id:productId}); 
    expect(result).toEqual(allProducts[0]); 
  })

  it ('should update product', async () => {
    const  productId = 1; 
    const productData: Product = {
      id: productId,
      name: 'Testing name',
      description: 'testing desc',
      price: 100,
      stock: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedData = {
        name: "updated testing name", 
        description: "updating testing desc"
    }; 

    //return
    (productRepository.findOneBy as jest.Mock).mockResolvedValue(productData); 
    (productRepository.save as jest.Mock).mockResolvedValue({
        ...productData, ...updatedData
    })

    const result = await productService.updateProduct(productId, updatedData); 

    //assertion
    expect(productRepository.findOneBy).toHaveBeenCalledWith({id: productId}); 
    expect(productRepository.save).toHaveBeenCalledWith(expect.objectContaining({...productData, ...updatedData})); 
    expect(result).toEqual({
      ...productData,
      ...updatedData,
    });
  })

  it ('should delete a product', async () => {
    const productId = 1; 

    //return 
    (productRepository.delete as jest.Mock).mockResolvedValue({affected: 1}); 

    const result = await productService.deleteProduct(productId); 

    //assertions
    expect(productRepository.delete).toHaveBeenCalledWith(productId); 
    expect(result).toEqual({affected: 1}); 
  })
});
