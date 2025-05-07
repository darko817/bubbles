import React, { createContext, useContext, useState } from "react";

type CartItem = {
  id: string;
  text: string;
  price: number;
  service: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  showAddedOverlay: boolean;
  overlayMessage: string;
  triggerOverlay: (message: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAddedOverlay, setShowAddedOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const triggerOverlay = (message: string) => {
    setOverlayMessage(message);
    setShowAddedOverlay(true);
    setTimeout(() => setShowAddedOverlay(false), 3000);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        showAddedOverlay,
        overlayMessage,
        triggerOverlay,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
