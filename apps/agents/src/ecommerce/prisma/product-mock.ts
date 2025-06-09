import { Prisma } from "../../generated/prisma/edge.js";

// Mock data for products skip the id field as it is auto-generated
export const products: Prisma.ProductCreateInput[] = [
  {
    name: "MacBook Pro de 14 pulgadas M4 Pro",
    description:
      "La MacBook Pro de 14 pulgadas con chip M4 Pro o M4 Max ofrece un rendimiento descomunal. Está diseñada para Apple Intelligence y tiene una batería que dura hasta 22 horas y una impresionante pantalla Liquid Retina XDR con un pico de brillo de hasta 1,600 nits. Es una pro en todos los sentidos.",
    price: 2_600.0,
    stock: 50,
    imageUrl:
      "https://ishop.gt/cdn/shop/files/IMG-15363172.jpg?v=1730309898&width=823",
    content: `
    MacBook Pro de 14 pulgadas M4 Pro:
    La MacBook Pro de 14 pulgadas con chip M4 Pro o M4 Max ofrece un rendimiento descomunal. 
    Está diseñada para Apple Intelligence y tiene una batería que dura hasta 22 horas y una 
    impresionante pantalla Liquid Retina XDR con un pico de brillo de hasta 1,600 nits. Es una pro en todos los sentidos.
    price: $ 2600.00
    procesador: M4 Pro o M4 Max
    memoria:24 GB
    almacenamiento: 512 GB o 1 TB SSD
    stock: 50
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
      "La MacBook Pro de 16 pulgadas con chip M4 Pro o M4 Max ofrece un rendimiento descomunal. Está diseñada para Apple Intelligence y tiene una batería que dura hasta 24 horas y una impresionante pantalla Liquid Retina XDR con un pico de brillo de hasta 1,600 nits. Es una pro en todos los sentidos.",
    price: 3_250.0,
    stock: 100,
    imageUrl:
      "https://ishop.gt/cdn/shop/files/IMG-15363188_cd705341-9450-490f-983b-efcf3dcf654d.jpg?v=1730310024&width=823",
    content: `
    MacBook Pro de 16 pulgadas M4 Pro:
    La MacBook Pro de 16 pulgadas con chip M4 Pro o M4 Max ofrece un rendimiento descomunal. 
    Está diseñada para Apple Intelligence y tiene una batería que dura hasta 24 horas 
    y una impresionante pantalla Liquid Retina XDR con un pico de brillo de hasta 1,600 nits. 
    Es una pro en todos los sentidos.
    price: $ 3,250.00
    procesador: M4 Pro chip with 14-core CPU, and 20-core GPU
    memoria: 24 GB o 48 GB
    almacenamiento: 512 GB
    stock: 100
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
      "La MacBook Pro de 16 pulgadas con chip M4 Pro o M4 Max ofrece un rendimiento descomunal. Está diseñada para Apple Intelligence y tiene una batería que dura hasta 24 horas y una impresionante pantalla Liquid Retina XDR con un pico de brillo de hasta 1,600 nits. Es una pro en todos los sentidos.",
    price: 4_600.0,
    stock: 75,
    imageUrl:
      "https://ishop.gt/cdn/shop/files/IMG-15363188.jpg?v=1730310003&width=823",
    content: `
    MacBook Pro de 16 pulgadas M4 Max:
    La MacBook Pro de 16 pulgadas con chip M4 Pro o M4 Max ofrece un rendimiento descomunal. 
    Está diseñada para Apple Intelligence y tiene una batería que dura hasta 24 horas 
    y una impresionante pantalla Liquid Retina XDR con un pico de brillo de hasta 1,600 nits. 
    Es una pro en todos los sentidos.
    price: $ 4,600.00
    procesador: M4 Max chip with 14-core CPU, and 32-core GPU o M4 Max chip with 16-core CPU, and 40-core GPU
    memoria: 36 GB o 48 GB
    almacenamiento: 1 TB
    stock: 75
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
    content: `Super flexible computer
    360-degree hinge, 12.2” touchscreen display with stylus support.
    Unusually capable for its size
    i3 and i5 13th Gen Intel® Core™ processors, upgradeable memory and storage, and a full size keyboard.
    Ultra-durable
    Shock-absorbing chassis meets MIL-STD-810 durability standards to protect from bumps and drops.
    price: $ 549.00
    processor: i3-1315U or i5-1334U
    memory: 8 GB to 48 GB DDR5-5600
    storage: 500 GB to 2 TB SSD or bring your own NVMe SSD
    operating system: Windows 11 or Bring your own OS(Linux)
    stock: 200
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
    content: `Designed for productivity.
    Featuring new AMD Ryzen™ AI 300 Series processors, Wi-Fi 7, a second generation keyboard, and new color customization options.
    At just 15.95mm thick and under 1.3kg, gaining repairability doesn’t mean losing portability.
    Storage:
    Never worry about running out of space. With standard M.2 SSDs, you can swap out your storage drive for high capacity ones up to a colossal 8TB.
    Memory:
    You can upgrade your RAM whenever you need to unlock higher performance during heavy multi-tasking. Our latest generation supports up to a massive 96GB of high-speed DDR5.
    price: $ 899.00
    processor: AMD Ryzen™ AI 300 Series processors,
    memory: 8 GB to 96 GB DDR5-5600
    storage: 500 GB to 8 TB SSD or bring your own NVMe SSD
    operating system: Windows 11 or Bring your own OS(Linux)
    stock: 150`,
    metadata: {
      category: "Electronics",
      productImage: "https://static.frame.work/psezretfa67f1yogx9w4ota6zmjs",
      brand: "Framework",
      tags: ["laptop", "electronics", "customizable"],
    },
  },
];
