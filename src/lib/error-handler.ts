export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  requestId?: string;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  
  private constructor() {}
  
  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public handleError(error: any, context?: string): AppError {
    const appError: AppError = {
      code: this.getErrorCode(error),
      message: this.getErrorMessage(error),
      details: this.getErrorDetails(error),
      timestamp: new Date(),
      requestId: this.generateRequestId()
    };

    // Log error
    this.logError(appError, context);

    // Send to monitoring service (if configured)
    this.sendToMonitoring(appError);

    return appError;
  }

  private getErrorCode(error: any): string {
    if (error.code) return error.code;
    if (error.name) return error.name;
    if (error.status) return `HTTP_${error.status}`;
    return 'UNKNOWN_ERROR';
  }

  private getErrorMessage(error: any): string {
    if (error.message) return error.message;
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred';
  }

  private getErrorDetails(error: any): any {
    const details: any = {};
    
    if (error.stack) details.stack = error.stack;
    if (error.status) details.status = error.status;
    if (error.response) details.response = error.response;
    if (error.config) details.config = error.config;
    
    return details;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private logError(error: AppError, context?: string): void {
    const logData = {
      ...error,
      context,
      environment: process.env.NODE_ENV,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
    };

    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Error:', logData);
    } else {
      // In production, you would send this to a logging service
      console.error('Production Error:', JSON.stringify(logData));
    }
  }

  private sendToMonitoring(error: AppError): void {
    // In production, you would send this to services like:
    // - Sentry
    // - LogRocket
    // - DataDog
    // - New Relic
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
      console.log('Would send to monitoring service:', error.code);
    }
  }

  public createUserFriendlyMessage(error: AppError): string {
    const userFriendlyMessages: Record<string, string> = {
      'NETWORK_ERROR': 'Unable to connect to our servers. Please check your internet connection and try again.',
      'AUTHENTICATION_ERROR': 'Your session has expired. Please log in again.',
      'PERMISSION_ERROR': 'You don\'t have permission to perform this action.',
      'VALIDATION_ERROR': 'Please check your input and try again.',
      'RATE_LIMIT_ERROR': 'Too many requests. Please wait a moment and try again.',
      'SERVER_ERROR': 'Something went wrong on our end. Please try again later.',
      'NOT_FOUND': 'The requested resource was not found.',
      'TIMEOUT_ERROR': 'The request timed out. Please try again.',
      'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again or contact support.'
    };

    return userFriendlyMessages[error.code] || userFriendlyMessages['UNKNOWN_ERROR'];
  }
}

// Error boundary for React components
export class ErrorBoundary extends Error {
  public componentStack?: string;
  public errorInfo?: any;

  constructor(message: string, componentStack?: string, errorInfo?: any) {
    super(message);
    this.name = 'ErrorBoundary';
    this.componentStack = componentStack;
    this.errorInfo = errorInfo;
  }
}

// API Error class
export class APIError extends Error {
  public status: number;
  public code: string;
  public details?: any;

  constructor(message: string, status: number, code: string, details?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Validation Error class
export class ValidationError extends Error {
  public field: string;
  public value: any;

  constructor(message: string, field: string, value?: any) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

// Utility function to handle async errors
export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Utility function to handle React async errors
export const handleAsyncError = async <T>(
  asyncFn: () => Promise<T>,
  errorHandler?: (error: any) => void
): Promise<T | null> => {
  try {
    return await asyncFn();
  } catch (error) {
    const handler = ErrorHandler.getInstance();
    const appError = handler.handleError(error);
    
    if (errorHandler) {
      errorHandler(appError);
    }
    
    return null;
  }
};
