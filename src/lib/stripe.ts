import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    campaigns: number;
    adAccounts: number;
    aiInsights: number;
    apiCalls: number;
  };
  stripePriceId: string;
  popular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses getting started',
    price: 29,
    interval: 'month',
    features: [
      'Up to 5 campaigns',
      '2 ad accounts',
      'Basic AI insights',
      'Email support',
      'Standard reporting'
    ],
    limits: {
      campaigns: 5,
      adAccounts: 2,
      aiInsights: 50,
      apiCalls: 1000
    },
    stripePriceId: 'price_starter_monthly' // Replace with actual Stripe price ID
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses with multiple campaigns',
    price: 79,
    interval: 'month',
    features: [
      'Up to 25 campaigns',
      '10 ad accounts',
      'Advanced AI insights',
      'Priority support',
      'Advanced reporting',
      'Custom dashboards',
      'API access'
    ],
    limits: {
      campaigns: 25,
      adAccounts: 10,
      aiInsights: 200,
      apiCalls: 5000
    },
    stripePriceId: 'price_professional_monthly', // Replace with actual Stripe price ID
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with complex needs',
    price: 199,
    interval: 'month',
    features: [
      'Unlimited campaigns',
      'Unlimited ad accounts',
      'Premium AI insights',
      'Dedicated support',
      'Custom reporting',
      'White-label options',
      'Advanced API access',
      'Custom integrations'
    ],
    limits: {
      campaigns: -1, // -1 means unlimited
      adAccounts: -1,
      aiInsights: -1,
      apiCalls: -1
    },
    stripePriceId: 'price_enterprise_monthly' // Replace with actual Stripe price ID
  }
];

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = stripe;
  }

  async createCheckoutSession(
    priceId: string,
    customerId?: string,
    successUrl?: string,
    cancelUrl?: string
  ) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: customerId,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: customerId || 'demo-user',
      },
    });

    return session;
  }

  async createCustomer(email: string, name?: string) {
    const customer = await this.stripe.customers.create({
      email,
      name,
      metadata: {
        source: 'ad-syntho-dashboard',
      },
    });

    return customer;
  }

  async getSubscription(subscriptionId: string) {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  }

  async cancelSubscription(subscriptionId: string) {
    const subscription = await this.stripe.subscriptions.cancel(subscriptionId);
    return subscription;
  }

  async updateSubscription(subscriptionId: string, newPriceId: string) {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    
    const updatedSubscription = await this.stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: 'create_prorations',
    });

    return updatedSubscription;
  }

  async getCustomerSubscriptions(customerId: string) {
    const subscriptions = await this.stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
    });

    return subscriptions;
  }

  async createBillingPortalSession(customerId: string, returnUrl?: string) {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return session;
  }

  async handleWebhook(payload: string, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }

    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    return event;
  }
}

export const stripeService = new StripeService();
