import { ACCOUNT_ROUTES, Order } from "@/types";

export const weights = [
  { id: "1", text: "0-500g", price: 150 },
  { id: "2", text: "500g-1kg", price: 250 },
  { id: "3", text: "1kg-2kg", price: 500 },
  { id: "4", text: "2kg-5kg", price: 1000 },
];

export const languages = [
  { label: "🇷🇸 Srpski", value: "sr" },
  { label: "🇬🇧 English", value: "en" },
  { label: "🇷🇺 Русский", value: "ru" },
];

export const accountCards = [
  {
    id: "1",
    icon: "user",
    text: "My orders",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.orders,
  },
  {
    id: "2",
    icon: "user",
    text: "Cart",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.cart,
  },
  {
    id: "3",
    icon: "user",
    text: "FAQ",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.faq,
  },
  {
    id: "4",
    icon: "user",
    text: "My profile",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.profile,
  },
  {
    id: "5",
    icon: "user",
    text: "Support",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.support,
  },
  {
    id: "8",
    icon: "user",
    text: "Log out",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.logout,
  },
];

export const faqData = [
  {
    question: "Kako mogu da poručim?",
    answer: "Dodajte proizvode u korpu i pratite korake za potvrdu porudžbine.",
  },
  {
    question: "Koji su načini plaćanja?",
    answer: "Možete platiti pouzećem ili platnom karticom.",
  },
  {
    question: "Kako da izmenim svoju porudžbinu?",
    answer: "Kontaktirajte nas direktno putem broja ili emaila prikazanog u aplikaciji.",
  },
];

export const orders: Order[] = [
  {
    id: "220926122712",
    orderNumber: "Porudzbina 1",
    timeRemaining: "7h",
    total: 1500,
    serviceType: "Premium pranje",
    quantity: "500g-1kg",
    pickupDate: "26-09-2022",
    pickupTime: "16:00-20:00",
  },
  {
    id: "220925876543",
    orderNumber: "Porudzbina 2",
    timeRemaining: "12h",
    total: 2350,
    serviceType: "Obično pranje",
    quantity: "1kg-2kg",
    pickupDate: "27-09-2022",
    pickupTime: "09:00-11:00",
  },
  {
    id: "220924112233",
    orderNumber: "Porudzbina 3",
    timeRemaining: "3h",
    total: 890,
    serviceType: "Peglanje",
    quantity: "do 10 komada",
    pickupDate: "26-09-2022",
    pickupTime: "14:00-16:00",
  },
  {
    id: "220923998877",
    orderNumber: "Porudzbina 4",
    timeRemaining: "18h",
    total: 3120,
    serviceType: "Hemijsko čišćenje",
    quantity: "1 komad",
    pickupDate: "28-09-2022",
    pickupTime: "10:00-12:00",
  },
  {
    id: "220922554433",
    orderNumber: "Porudzbina 5",
    timeRemaining: "1h",
    total: 560,
    serviceType: "Pranje obuće",
    quantity: "1 par",
    pickupDate: "27-09-2022",
    pickupTime: "17:00-19:00",
  },
];