// Analytics and monitoring utilities

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

export class Analytics {
  private static instance: Analytics;
  private events: AnalyticsEvent[] = [];

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public track(event: AnalyticsEvent) {
    const eventWithTimestamp = {
      ...event,
      timestamp: new Date(),
    };

    this.events.push(eventWithTimestamp);

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(eventWithTimestamp);
    } else {
      console.log('📊 Analytics Event:', eventWithTimestamp);
    }
  }

  public pageView(page: string, userId?: string) {
    this.track({
      name: 'page_view',
      properties: {
        page,
        url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
      },
      userId,
    });
  }

  public userAction(action: string, properties?: Record<string, any>, userId?: string) {
    this.track({
      name: 'user_action',
      properties: {
        action,
        ...properties,
      },
      userId,
    });
  }

  public campaignEvent(event: string, campaignId: string, properties?: Record<string, any>, userId?: string) {
    this.track({
      name: 'campaign_event',
      properties: {
        event,
        campaignId,
        ...properties,
      },
      userId,
    });
  }

  public aiInsightEvent(insightType: string, properties?: Record<string, any>, userId?: string) {
    this.track({
      name: 'ai_insight_event',
      properties: {
        insightType,
        ...properties,
      },
      userId,
    });
  }

  public subscriptionEvent(event: string, planId: string, properties?: Record<string, any>, userId?: string) {
    this.track({
      name: 'subscription_event',
      properties: {
        event,
        planId,
        ...properties,
      },
      userId,
    });
  }

  public errorEvent(error: string, properties?: Record<string, any>, userId?: string) {
    this.track({
      name: 'error_event',
      properties: {
        error,
        ...properties,
      },
      userId,
    });
  }

  private async sendToAnalytics(event: AnalyticsEvent) {
    try {
      // Send to multiple analytics services
      await Promise.allSettled([
        this.sendToGoogleAnalytics(event),
        this.sendToMixpanel(event),
        this.sendToCustomEndpoint(event),
      ]);
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  private async sendToGoogleAnalytics(event: AnalyticsEvent) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, {
        event_category: 'engagement',
        event_label: event.name,
        value: 1,
        ...event.properties,
      });
    }
  }

  private async sendToMixpanel(event: AnalyticsEvent) {
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track(event.name, {
        ...event.properties,
        distinct_id: event.userId,
      });
    }
  }

  private async sendToCustomEndpoint(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      // Silently fail for analytics
    }
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public clearEvents() {
    this.events = [];
  }
}

// React hook for analytics
export const useAnalytics = () => {
  const analytics = Analytics.getInstance();

  return {
    track: analytics.track.bind(analytics),
    pageView: analytics.pageView.bind(analytics),
    userAction: analytics.userAction.bind(analytics),
    campaignEvent: analytics.campaignEvent.bind(analytics),
    aiInsightEvent: analytics.aiInsightEvent.bind(analytics),
    subscriptionEvent: analytics.subscriptionEvent.bind(analytics),
    errorEvent: analytics.errorEvent.bind(analytics),
  };
};

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public startTiming(name: string) {
    this.metrics.set(name, performance.now());
  }

  public endTiming(name: string): number {
    const startTime = this.metrics.get(name);
    if (!startTime) {
      console.warn(`No start time found for metric: ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(name);

    // Log performance metric
    console.log(`⏱️ Performance: ${name} took ${duration.toFixed(2)}ms`);

    // Send to analytics
    const analytics = Analytics.getInstance();
    analytics.track({
      name: 'performance_metric',
      properties: {
        metric: name,
        duration,
      },
    });

    return duration;
  }

  public measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(name);
    return fn().finally(() => {
      this.endTiming(name);
    });
  }
}

// Error tracking
export class ErrorTracker {
  private static instance: ErrorTracker;

  private constructor() {}

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  public trackError(error: Error, context?: string, userId?: string) {
    const analytics = Analytics.getInstance();
    
    analytics.errorEvent(error.message, {
      stack: error.stack,
      context,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : '',
    }, userId);

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(error, context, userId);
    }
  }

  private async sendToErrorService(error: Error, context?: string, userId?: string) {
    try {
      // Send to Sentry, LogRocket, or other error tracking service
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          tags: {
            context,
            userId,
          },
        });
      }
    } catch (e) {
      console.error('Failed to send error to tracking service:', e);
    }
  }
}

// Initialize analytics on page load
if (typeof window !== 'undefined') {
  const analytics = Analytics.getInstance();
  analytics.pageView(window.location.pathname);
}
