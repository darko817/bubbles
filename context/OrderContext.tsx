import { orders } from "@/constants/data";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  timeRemaining: string;
  total: number;
  serviceType: string;
  quantity: string;
  pickupDate: string;
  pickupTime: string;
}

interface OrderContextType {
  newOrders: Order[];
  acceptedOrders: Order[];
  acceptOrder: (order: Order) => void;
  denyOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [newOrders, setNewOrders] = useState<Order[]>(orders);
  const [acceptedOrders, setAcceptedOrders] = useState<Order[]>([]);

  const acceptOrder = (order: Order) => {
    setNewOrders((prev) => prev.filter((o) => o.id !== order.id));
    setAcceptedOrders((prev) => [...prev, order]);
  };

  const denyOrder = (orderId: string) => {
    setNewOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <OrderContext.Provider
      value={{ newOrders, acceptedOrders, acceptOrder, denyOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrderContext must be used within OrderProvider");
  return context;
};
