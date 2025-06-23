import { PrismaClient } from "src/generated/prisma/client.js";
import { ProductPriceFilter } from "../tools.js";
import { ProductList } from "./types.js";
import { formatPrice } from "@/agents-uis/utils.js";

const prisma = new PrismaClient();

export async function laptopsByPrice(
  price: ProductPriceFilter
): Promise<ProductList> {
  try {
    const priceKeys = Object.keys(price);
    const priceValues = Object.values(price);
    const areAllValuesNumbers = priceValues.every(
      (value) => typeof value === "number"
    );
    const areAllKeysValid = priceKeys.every((key) =>
      ["equals", "lt", "lte", "gt", "gte"].includes(key)
    );
    if (priceKeys.length === 0 || !areAllValuesNumbers || !areAllKeysValid) {
      return []; // No valid operator found
    }

    const itemsByPrice = await prisma.product.findMany({
      where: {
        price,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    });
    // Convert Prisma's Product type to our ProductList type
    const productList: ProductList = itemsByPrice.map((item) => ({
      name: item.name,
      description: item.description,
      price: formatPrice(item.price), // Ensure price is a string
      imageUrl:
        item.imageUrl ??
        "https://static.frame.work/sf2283foiw5bd760wbrlyk0230ov",
      productId: item.id, // Assuming id is the productId
    }));
    // if no items found, return early
    if (productList.length === 0) {
      // return "No laptops found for the specified price range.";
      return [];
    }
    return productList;
  } catch (error) {
    console.error("Error parsing price:", error);
    return []; // Return empty array on error
  } finally {
    await prisma.$disconnect();
  }
}

// void (async () => {
//   const priceFilter: ProductPriceFilter = {
//     gte: 1000,
//     lte: 5000,
//   };
//   const result = await laptopsByPrice(priceFilter);
//   console.log(result);
//   await prisma.$disconnect();
// })();
