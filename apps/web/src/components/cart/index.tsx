"use client";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useGraphState } from "@/providers/GraphState";

interface CartItem {
  productId: string;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

interface CartProps {
  initialItems?: CartItem[];
}

function parseCurrencyString(input: string): number {
  // Match numbers with optional sign, commas/spaces as separators, and decimal part
  const regex = /[+-]?\s*(?:\d[\d,\s]*(?:\.\d*)?|\.\d+)/;
  const match = input.match(regex);

  if (!match) return NaN;

  // Remove commas, spaces, and any remaining non-numeric characters
  const cleanString = match[0].replace(/[^\d.-]/g, "");

  // Final check for valid number format before parsing
  if (
    !/^[-+]?\d*\.?\d+$/.test(cleanString) ||
    !/^[-+]?(\d+|\d*\.\d+)$/.test(cleanString)
  ) {
    return NaN;
  }

  return parseFloat(cleanString);
}

export default function Cart({ initialItems = [] }: CartProps) {
  console.log("Cart component initialized with items:", initialItems);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  const [threadId] = useQueryState("threadId");
  const [apiUrl] = useQueryState("apiUrl");
  console.dir({ threadId, apiUrl }, { depth: null });
  const { getCurrentGraphState } = useGraphState();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const currentState = await getCurrentGraphState();
        if (!currentState?.productsInCart?.length) {
          setCartItems([]);
          return;
        }
        const productsInCart = currentState?.productsInCart
          .filter((item) => !!item)
          .map((item) => ({
            ...item,
            quantity: 1,
          }));
        setCartItems(productsInCart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }

    if (threadId && apiUrl) {
      fetchCartItems();
    }
  }, [threadId, apiUrl, getCurrentGraphState]);


  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.productId === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseCurrencyString(item.price) * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <span className="text-gray-600">
          {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium text-gray-700">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-center">Total</div>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 items-center"
          >
            {/* Product Info */}
            <div className="col-span-6 flex items-center space-x-4">
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center">
              <span className="font-medium">
                ${parseCurrencyString(item.price).toFixed(2)}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="col-span-2 flex items-center justify-center space-x-2">
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>

            {/* Item Total */}
            <div className="col-span-2 text-center">
              <span className="font-medium">
                ${(parseCurrencyString(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium">Subtotal:</span>
          <span className="text-2xl font-bold">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button
            disabled
            className="col-span-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg 
            hover:bg-gray-300 transition-colors font-medium cursor-not-allowed"
          >
            Continue Shopping
          </button>
          <button
            disabled
            className="mt-3 col-span-1 col-start-4 bg-emerald-400 text-white font-bold py-2 rounded-lg 
            hover:bg-emerald-600 transition cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
