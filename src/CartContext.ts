import { createContext, useContext } from "react";
import type { ICartContext } from "./types";

export const CartContext = createContext<ICartContext | null>(null);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartContext provider");
  }

  return context;
}
