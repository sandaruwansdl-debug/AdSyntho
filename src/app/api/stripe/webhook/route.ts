import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '../../../../lib/stripe';
import { APIErrorHandler, withErrorHandling } from '../../../../lib/api-error-handler';
import { prisma } from '../../../../lib/prisma';

export const POST = withErrorHandling(async (request: NextRequest) => {
  const apiErrorHandler = APIErrorHandler.getInstance();
  
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return apiErrorHandler.unauthorized('Missing Stripe signature');
  }

  try {
    const event = await stripeService.handleWebhook(body, signature);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return apiErrorHandler.success({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return apiErrorHandler.serverError('Webhook processing failed');
  }
});

async function handleCheckoutSessionCompleted(session: any) {
  const customerId = session.customer;
  const subscriptionId = session.subscription;
  
  if (!customerId || !subscriptionId) {
    throw new Error('Missing customer or subscription ID in checkout session');
  }

  // Get subscription details from Stripe
  const subscription = await stripeService.getSubscription(subscriptionId);
  
  // Update user subscription in database
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscriptionId },
    update: {
      status: subscription.status,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: subscription.items.data[0].price.id,
    },
    create: {
      userId: session.metadata?.userId || 'unknown',
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      status: subscription.status,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: subscription.items.data[0].price.id,
    },
  });

  console.log(`Checkout session completed for customer ${customerId}`);
}

async function handleSubscriptionCreated(subscription: any) {
  const customerId = subscription.customer;
  
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      status: subscription.status,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: subscription.items.data[0].price.id,
    },
    create: {
      userId: 'unknown', // This should be retrieved from customer metadata
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: subscription.items.data[0].price.id,
    },
  });

  console.log(`Subscription created: ${subscription.id}`);
}

async function handleSubscriptionUpdated(subscription: any) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: subscription.items.data[0].price.id,
    },
  });

  console.log(`Subscription updated: ${subscription.id}`);
}

async function handleSubscriptionDeleted(subscription: any) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'canceled',
    },
  });

  console.log(`Subscription canceled: ${subscription.id}`);
}

async function handlePaymentSucceeded(invoice: any) {
  const subscriptionId = invoice.subscription;
  
  if (subscriptionId) {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: 'active',
      },
    });
  }

  console.log(`Payment succeeded for invoice: ${invoice.id}`);
}

async function handlePaymentFailed(invoice: any) {
  const subscriptionId = invoice.subscription;
  
  if (subscriptionId) {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: 'past_due',
      },
    });
  }

  console.log(`Payment failed for invoice: ${invoice.id}`);
}
