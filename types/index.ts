export const ACCOUNT_ROUTES = {
  orders: "/(account)/orders",
  cart: "/(account)/cart",
  faq: "/(account)/faq",
  profile: "/(account)/(profile)",
  support: "/(account)/support",
  language: "/(account)/language",
  notifications: "/(account)/notifications",
  logout: "/(account)/logout",
} as const;

export type User = {
  name: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: "client" | "worker" | "driver"
};

export interface Order {
  id: string;
  orderNumber: string;
  timeRemaining: string;
  total: number;
  serviceType: string;
  quantity: string;
  pickupDate: string;
  pickupTime: string;
}