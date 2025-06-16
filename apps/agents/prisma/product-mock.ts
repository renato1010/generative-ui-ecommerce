import { Prisma } from "../src/generated/prisma/edge.js";

// Mock data for products skip the id field as it is auto-generated
export const products: Prisma.ProductCreateInput[] = [
  {
    name: "MacBook Pro de 14 pulgadas M4 Pro",
    description:
      "The 14-inch MacBook Pro with M4 Pro or M4 Max chip delivers tremendous performance. It is designed for Apple Intelligence and has a battery that lasts up to 22 hours and an impressive Liquid Retina XDR display with a peak brightness of up to 1,600 nits. It is a pro in every sense of the word.",
    price: 2_600.0,
    stock: 50,
    imageUrl:
      "https://ishop.gt/cdn/shop/files/IMG-15363172.jpg?v=1730309898&width=823",
    content: `
    <product>
    name: MacBook Pro de 14 pulgadas M4 Pro
    description: The 14-inch MacBook Pro with M4 Pro or M4 Max chip delivers tremendous performance. It is designed for Apple Intelligence and has a battery that lasts up to 22 hours and an impressive Liquid Retina XDR display with a peak brightness of up to 1,600 nits. It is a pro in every sense of the word.
    brand: Apple
    price: $ 2600.00
    processor: M4 Pro o M4 Max
    memory:24 GB
    storage: 512 GB o 1 TB SSD
    imageUrl: https://ishop.gt/cdn/shop/files/IMG-15363172.jpg?v=1730309898&width=823
    </product>
    `,
    metadata: {
      category: "Electronics",
      productImage:
        "https://ishop.gt/cdn/shop/files/IMG-15363172.jpg?v=1730309898&width=823",
      brand: "Apple",
      tags: ["laptop", "electronics", "professional"],
    },
  },
  {
    name: "MacBook Pro de 16 pulgadas M4 Pro",
    description:
      "The 16-inch MacBook Pro with M4 Pro or M4 Max chip delivers tremendous performance. It is designed for Apple Intelligence and has a battery that lasts up to 24 hours and an impressive Liquid Retina XDR display with a peak brightness of up to 1,600 nits. It is a pro in every sense of the word.",
    price: 3_250.0,
    stock: 100,
    imageUrl:
      "https://ishop.gt/cdn/shop/files/IMG-15363188_cd705341-9450-490f-983b-efcf3dcf654d.jpg?v=1730310024&width=823",
    content: `
    <product>
    name: MacBook Pro de 16 pulgadas M4 Pro:
    description: The 16-inch MacBook Pro with M4 Pro or M4 Max chip delivers tremendous performance. It is designed for Apple Intelligence and has a battery that lasts up to 24 hours and an impressive Liquid Retina XDR display with a peak brightness of up to 1,600 nits. It is a pro in every sense of the word. 
    brand: Apple
    price: $ 3,250.00
    processor: M4 Pro chip with 14-core CPU, and 20-core GPU
    memory: 24 GB o 48 GB
    storage: 512 GB
    imageUrl: https://ishop.gt/cdn/shop/files/IMG-15363188_cd705341-9450-490f-983b-efcf3dcf654d.jpg?v=1730310024&width=823
    </product>
    `,
    metadata: {
      category: "Electronics",
      productImage:
        "https://ishop.gt/cdn/shop/files/IMG-15363188_cd705341-9450-490f-983b-efcf3dcf654d.jpg?v=1730310024&width=823",
      brand: "Apple",
      tags: ["laptop", "electronics", "professional"],
    },
  },
  {
    name: "MacBook Pro de 16 pulgadas M4 Max",
    description:
      "The 16-inch MacBook Pro with M4 Pro or M4 Max chip delivers tremendous performance. It is designed for Apple Intelligence and has a battery that lasts up to 24 hours and an impressive Liquid Retina XDR display with a peak brightness of up to 1,600 nits. It is a pro in every sense of the word.",
    price: 4_600.0,
    stock: 75,
    imageUrl:
      "https://ishop.gt/cdn/shop/files/IMG-15363188.jpg?v=1730310003&width=823",
    content: `
    <product>
    name: MacBook Pro de 16 pulgadas M4 Max
    description: The 16-inch MacBook Pro with M4 Pro or M4 Max chip delivers tremendous performance. It is designed for Apple Intelligence and has a battery that lasts up to 24 hours and an impressive Liquid Retina XDR display with a peak brightness of up to 1,600 nits. It is a pro in every sense of the word.
    brand: Apple
    price: $ 4,600.00
    processor: M4 Max chip with 14-core CPU, and 32-core GPU o M4 Max chip with 16-core CPU, and 40-core GPU
    memory: 36 GB o 48 GB
    storage: 1 TB
    imageUrl: https://ishop.gt/cdn/shop/files/IMG-15363188.jpg?v=1730310003&width=823
    </product>
    `,
    metadata: {
      category: "Electronics",
      productImage:
        "https://ishop.gt/cdn/shop/files/IMG-15363188.jpg?v=1730310003&width=823",
      brand: "Apple",
      tags: ["laptop", "electronics", "professional"],
    },
  },
  {
    name: "Framework Laptop 12",
    description:
      "Framework Laptop 12 is a 12.2” convertible with stylus support. Designed for easy customization, upgrades, and repairs.",
    price: 549.0,
    stock: 200,
    imageUrl: "https://static.frame.work/aw4g9lnhfiut1k6qwdnxyy1r5ht3",
    content: `
    <product>
    name: Framework Laptop 12
    description: Super flexible computer
    360-degree hinge, 12.2” touchscreen display with stylus support.
    Unusually capable for its size
    i3 and i5 13th Gen Intel® Core™ processors, upgradeable memory and storage, and a full size keyboard.
    Ultra-durable
    Shock-absorbing chassis meets MIL-STD-810 durability standards to protect from bumps and drops.
    brand: Framework
    price: $ 549.00
    processor: i3-1315U or i5-1334U
    memory: 8 GB to 48 GB DDR5-5600
    storage: 500 GB to 2 TB SSD or bring your own NVMe SSD
    operating system: Windows 11 or Bring your own OS(Linux)
    imageUrl: https://static.frame.work/aw4g9lnhfiut1k6qwdnxyy1r5ht3
    </product>
`,
    metadata: {
      category: "Electronics",
      productImage: "https://static.frame.work/aw4g9lnhfiut1k6qwdnxyy1r5ht3",
      brand: "Framework",
      tags: ["laptop", "electronics", "customizable"],
    },
  },
  {
    name: "Framework Laptop 13",
    description:
      "Framework Laptop 13 is a 13” laptop with a 16:10 display, designed for easy customization, upgrades, and repairs.",
    price: 899.0,
    stock: 150,
    imageUrl: "https://static.frame.work/psezretfa67f1yogx9w4ota6zmjs",
    content: `
    <product>
    name: Framework Laptop 13
    description: Designed for productivity.
    Featuring new AMD Ryzen™ AI 300 Series processors, Wi-Fi 7, a second generation keyboard, and new color customization options.
    At just 15.95mm thick and under 1.3kg, gaining repairability doesn’t mean losing portability.
    You can upgrade your RAM whenever you need to unlock higher performance during heavy multi-tasking. Our latest generation supports up to a massive 96GB of high-speed DDR5.
    Never worry about running out of space. With standard M.2 SSDs, you can swap out your storage drive for high capacity ones up to a colossal 8TB.
    brand: Framework
    price: $ 899.00
    processor: AMD Ryzen™ AI 300 Series processors,
    memory: 8 GB to 96 GB DDR5-5600
    storage: 500 GB to 8 TB SSD or bring your own NVMe SSD
    operating system: Windows 11 or Bring your own OS(Linux)
    imageUrl: https://static.frame.work/psezretfa67f1yogx9w4ota6zmjs
    </product>
    `,
    metadata: {
      category: "Electronics",
      productImage: "https://static.frame.work/psezretfa67f1yogx9w4ota6zmjs",
      brand: "Framework",
      tags: ["laptop", "electronics", "customizable"],
    },
  },
  {
    name: "Framework Laptop 16",
    description:
      "Framework Laptop 16 is a 16” laptop Powered by AMD Ryzen™ 7040HS and Radeon™ RX 7700S, designed for easy customization, upgrades, and repairs.",
    price: 1_599.0,
    stock: 100,
    imageUrl: "https://static.frame.work/kiyog1j75r9alrw4940qke63y3ym",
    content: `
    <product>
    name: Framework Laptop 16
    description: A high-performance laptop with upgradeable, modular, latest-generation graphics.
    A high-performance laptop with upgradeable, modular, latest-generation graphics. 
    Swap and upgrade peripherals independently of the rest of the laptop, 
    including generation over generation discrete GPUs. 
    The AMD Radeon™ RX 7700S Graphics Module with 8GB of GDDR6 
    enables intense gaming and creativity applications. 
    If you want a thinner and lighter system, 
    you can switch to an Expansion Bay Shell and use 
    the impressive integrated graphics capabilities of Ryzen 7040 Series.
    brand: Framework
    price: $ 1,599.00
    processor: AMD Ryzen™ 7 7840HS or AMD Ryzen™ 9 7940HS
    memory: 8 GB to 96 GB DDR5-5600
    storage:
      primary: 250 GB to 8 TB SSD or bring your own NVMe SSD
      secondary: 500 GB to 2 TB SSD or bring your own NVMe SSD 
    operating system: Windows 11 or Bring your own OS(Linux)
    imageUrl: https://static.frame.work/kiyog1j75r9alrw4940qke63y3ym
    </product>
    `,
    metadata: {
      category: "Electronics",
      productImage: "https://static.frame.work/kiyog1j75r9alrw4940qke63y3ym",
      brand: "Framework",
      tags: ["laptop", "electronics", "customizable"],
    },
  },
];
