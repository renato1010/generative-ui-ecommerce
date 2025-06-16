import { PrismaClient } from "src/generated/prisma/client.js";
import { ProductPriceFilter } from "../tools.js";

// utility function to parse price based on Intl.NumberFormat
function parsePrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const prisma = new PrismaClient();
export async function laptopsByPrice(
  price: ProductPriceFilter
): Promise<string> {
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
      return ""; // No valid operator found
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
    // if no items found, return early
    if (itemsByPrice.length === 0) {
      return "No laptops found for the specified price range.";
    }
    const stringifiedItems = itemsByPrice
      .map((item, idx) => {
        const parsedPrice = parsePrice(item.price);
        return `Product # ${idx + 1}:\n
        Name: ${item.name}\n
        Description: ${item.description}\n
        Price: ${parsedPrice}\n
        Image URL: ${item.imageUrl}\n`;
      })
      .join("\n\n");
    return `Laptops by price\n\n${stringifiedItems}`;
  } catch (error) {
    console.error("Error parsing price:", error);
    return ""; // Return empty string on error
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
