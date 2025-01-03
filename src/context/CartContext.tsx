"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { ProductItem } from "@/app/api/products-data/data";

type CartContextType = {
  cart: ProductItem[];
  addToCart: (product: ProductItem) => void;
  removeFromCart: (productId: number) => void;
};

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductItem[]>([]);

  const addToCart = (product: ProductItem) => {
    if (product?.id === undefined) {
      console.error("Product must have a valid 'id'.", product);
      return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);
    if (!existingProduct) {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
