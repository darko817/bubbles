import { ACCOUNT_ROUTES } from "@/types";

export const weights = [
  { id: "1", text: "0-500g", price: 150 },
  { id: "2", text: "500g-1kg", price: 250 },
  { id: "3", text: "1kg-2kg", price: 500 },
  { id: "4", text: "2kg-5kg", price: 1000 },
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
    id: "6",
    icon: "user",
    text: "Language",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.language,
  },
  {
    id: "7",
    icon: "user",
    text: "Notifications",
    icon2: "chevron-right",
    route: ACCOUNT_ROUTES.notifications,
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