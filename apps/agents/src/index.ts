import { PrismaClient, Prisma } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

export async function createProduct(productObj: Prisma.ProductCreateInput) {
  const newProduct = await prisma.product.create({
    data: productObj,
    select: { name: true, price: true, description: true },
  });
  console.dir({ newProduct }, { depth: 2 });
}

// ** script to run during demo to prove the Prisma Client works with the database **

// void (async () => {
//   try {
//     await prisma.$connect();
//     console.log("Connected to the database successfully.");

//     // Example product data
//     const productData: Prisma.ProductCreateInput = {
//       name: "Sample Product",
//       price: 19.99,
//       description: "This is a sample product description.",
//     };

//     // Create a new product
//     await createProduct(productData);
//   } catch (error) {
//     console.error(
//       "Error connecting to the database or creating product:",
//       error
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// })();
