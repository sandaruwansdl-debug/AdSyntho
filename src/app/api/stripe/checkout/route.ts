import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '../../../../lib/stripe';
import { SUBSCRIPTION_PLANS } from '../../../../lib/stripe';
import { APIErrorHandler, withErrorHandling } from '../../../../lib/api-error-handler';

export const POST = withErrorHandling(async (request: NextRequest) => {
  const apiErrorHandler = APIErrorHandler.getInstance();
  
  const body = await request.json();
  const { planId, customerEmail, customerName } = body;

  if (!planId) {
    return apiErrorHandler.validationError({
      planId: ['Plan ID is required']
    });
  }

  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!plan) {
    return apiErrorHandler.notFound('Subscription plan');
  }

  try {
    // For demo purposes, we'll use a mock customer ID
    // In production, you would create or retrieve the actual customer
    const customerId = 'cus_demo_customer';
    
    const session = await stripeService.createCheckoutSession(
      plan.stripePriceId,
      customerId,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`
    );

    return apiErrorHandler.success({
      sessionId: session.id,
      url: session.url,
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price
      }
    }, 'Checkout session created successfully');
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return apiErrorHandler.serverError('Failed to create checkout session');
  }
});
