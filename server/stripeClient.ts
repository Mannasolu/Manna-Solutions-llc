import Stripe from 'stripe';

async function getCredentials() {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  const secretKey = process.env.STRIPE_API_SECRET_KEY;

  if (!publishableKey || !secretKey) {
    throw new Error(
      'Stripe API keys not configured. Please set STRIPE_PUBLISHABLE_KEY and STRIPE_API_SECRET_KEY environment variables.'
    );
  }

  return {
    publishableKey,
    secretKey,
  };
}

export async function getUncachableStripeClient() {
  const { secretKey } = await getCredentials();

  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil',
  });
}

export async function getStripePublishableKey() {
  const { publishableKey } = await getCredentials();
  return publishableKey;
}

export async function getStripeSecretKey() {
  const { secretKey } = await getCredentials();
  return secretKey;
}

