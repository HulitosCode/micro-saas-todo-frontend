import dotenv from 'dotenv';
dotenv.config(); // Certifique-se de carregar as variáveis de ambiente

export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "",
    // webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    plans: {
      free: {
        priceId: process.env.STRIPE_FREE_PRICE_ID || "",
        quota: { TASKS: 5 },
      },
      pro: {
        priceId: process.env.STRIPE_PRO_PRICE_ID || "",
        quota: { TASKS: -1 }, // -1 = ilimitado & 100 = limitado
      },
    },
  },
};
