import Stripe from "stripe";
import { prisma } from "../database";
import { config } from "../../config";

// Inicializa a instância do Stripe com a chave secreta fornecida e configura a versão da API
export const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: "2025-02-24.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]
}

export const createStripeCustomer = async (input: {
  name?: string
  email: string
}) => {
  const customer = await getStripeCustomerByEmail(input.email)
  if (customer) return customer

  const createdCustomer = await stripe.customers.create({
    email: input.email,
    name: input.name,
  })

  const createdCustomerSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ price: config.stripe.plans.free.priceId }],
  })

  await prisma.user.update({
    where: {
      email: input.email,
    },
    data: {
      stripeCustomerId: createdCustomer.id,
      stripeSubscriptionId: createdCustomerSubscription.id,
      stripeSubscriptionStatus: createdCustomerSubscription.status,
      stripePriceId: config.stripe.plans.free.priceId,
    },
  })

  return createdCustomer
}

// Função para criar uma sessão de checkout para o pagamento no Stripe
export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
) => {
  try {
    // Cria ou recupera o cliente no Stripe
    const customer = await createStripeCustomer({
      email: userEmail,
    });

    // Cria uma sessão de checkout para o usuário
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      client_reference_id: userId, // Refere-se ao ID do usuário em seu sistema
      customer: customer.id, // ID do cliente no Stripe
      success_url: `http://localhost:3000/app/settings/billing?success=true`, // URL de sucesso
      cancel_url: `http://localhost:3000/app/settings/billing?success=false`, // URL de cancelamento
      line_items: [
        {
          price: config.stripe.plans.pro.priceId, // ID do preço do produto no Stripe
          quantity: 1,
        },
      ],
    });
    // Retorna o ID do cliente e a URL da sessão de checkout
    return {
      // stripeCustomerId: (await customer).id,
      url: session.url,
    };
  } catch (error) {
    console.log(error);
    // Caso ocorra um erro, lança uma exceção
    throw new Error("Error to create checkout session");
  }
};

// Função para processar o webhook de conclusão da sessão de checkout
// export const handleProcessWebhookCheckout = async (event: {
//   object: Stripe.Checkout.Session;
// }) => {
//   const clientReferenceId = event.object.client_reference_id as string;
//   const stripeSubscriptionId = event.object.subscription as string;
//   const stripeCustomerId = event.object.customer as string;
//   const checkoutStatus = event.object.status;

//   // Verifica se a sessão de checkout foi concluída com sucesso
//   if (checkoutStatus !== "complete") return;

//   // Valida os dados necessários para a atualização
//   if (!clientReferenceId || !stripeSubscriptionId || !stripeCustomerId) {
//     throw new Error(
//       "clientReferenceId, stripeSubscriptionId and stripeCustomerId is required",
//     );
//   }

//   // Verifica se o usuário com o ID fornecido existe
//   const userExists = await prisma.user.findUnique({
//     where: {
//       id: clientReferenceId,
//     },
//     select: {
//       id: true,
//     },
//   });

//   if (!userExists) {
//     throw new Error("user of clientReferenceId not found");
//   }

//   // Atualiza os dados do usuário no banco de dados com as informações do Stripe
//   await prisma.user.update({
//     where: {
//       id: userExists.id,
//     },
//     data: {
//       stripeCustomerId,
//       stripeSubscriptionId,
//     },
//   });
// };

// Função para processar o webhook de atualização da assinatura
// export const handleProcessWebhookUpdatedSubscription = async (event: {
//   data: { object: Stripe.Subscription };
// }) => {
//   // Extrai os dados da assinatura do evento
//   const stripeCustomerId = event.data.object.customer as string;
//   const stripeSubscriptionId = event.data.object.id as string;
//   const stripeSubscriptionStatus = event.data.object.status;

//   // Valida se os dados essenciais da assinatura estão presentes
//   if (!stripeCustomerId || !stripeSubscriptionId || !stripeSubscriptionStatus) {
//     throw new Error(
//       "stripeCustomerId, stripeSubscriptionId ou stripeSubscriptionStatus estão indefinidos.",
//     );
//   }

//   // Verifica se o usuário associado à assinatura existe no banco de dados
//   const userExists = await prisma.user.findFirst({
//     where: {
//       stripeCustomerId,
//     },
//     select: {
//       id: true,
//     },
//   });

//   if (!userExists) {
//     throw new Error("Usuário com stripeCustomerId não encontrado.");
//   }

//   // Atualiza os dados da assinatura do usuário no banco de dados
//   await prisma.user.update({
//     where: {
//       id: userExists.id,
//     },
//     data: {
//       stripeSubscriptionId,
//       stripeSubscriptionStatus,
//     },
//   });
// };
