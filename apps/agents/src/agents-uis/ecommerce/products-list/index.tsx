import "./index.css";
import { useState } from "react";
import { UIMessage, useStreamContext } from "@langchain/langgraph-sdk/react-ui";
import { Message } from "@langchain/langgraph-sdk";
import { type ProductList } from "@/ecommerce/utils/types.js";

type Product = ProductList[number];
export default function ProductsList({ products }: { products: ProductList }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}

/* Product Card Component */

interface ProductCardProps {
  product: Product;
  onCardClick?: (product: Product) => void;
  className?: string;
}

function ProductCard({
  product,
  onCardClick,
  className = "",
}: ProductCardProps) {
  const urlParams = new URLSearchParams(window.location.search);
  const threadId = urlParams.get("threadId");
  const apiUrl = urlParams.get("apiUrl") || "http://localhost:2024";
  const url = new URL(window.location.href);
  const baseUrl = url.origin + url.pathname;
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const thread = useStreamContext<
    { messages: Message[]; ui: UIMessage[] },
    { MetaType: { ui: UIMessage | undefined } }
  >();

  const handleCardClick = () => {
    onCardClick?.(product);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleAddtoCart = (product: Product) => {
    console.log("Adding product to cart:", product);
    thread.submit(
      {},
      {
        command: {
          update: {
            productsInCart: [product],
          },
          goto: "__end__",
        },
      }
    );
    window.location.href = `${baseUrl}/cart?threadId=${threadId}&apiUrl=${apiUrl}`;
  };

  // Fallback values for missing data
  const displayName = product.name || "Product Name Unavailable";
  const displayBrand = product.brand || "Unknown Brand";
  const displayDescription = product.description || "No description available";
  const displayPrice = product.price ? product.price : "$0.00";

  return (
    <div
      className={`
        group bg-white rounded-lg shadow-sm border border-gray-200 
        hover:shadow-md transition-all duration-300 overflow-hidden
        cursor-pointer max-w-sm w-full
        ${className}
      `}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {/* Loading Skeleton */}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}

        {/* Image */}
        {!imageError ? (
          <img
            src={product.imageUrl || "/api/placeholder/300/300"}
            alt={displayName}
            className={`
              w-full h-full object-cover group-hover:scale-105 transition-transform duration-300
              ${imageLoading ? "opacity-0" : "opacity-100"}
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
            <div className="w-16 h-16 mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm text-center px-4">Image not available</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <div className={`mb-2 ${!product.brand ? "hidden" : ""}`}>
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
            {displayBrand}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {displayName}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {displayDescription}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-xl">
              {displayPrice}
            </span>
          </div>
        </div>
        {/* Add to Cart Button */}
        <button
          className="mt-3 w-full bg-orange-600 text-white font-bold py-2 rounded-lg 
        hover:bg-orange-700 transition"
          onClick={() => handleAddtoCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
