import { NextRequest, NextResponse } from 'next/server';
import { ErrorHandler, APIError, ValidationError } from './error-handler';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
  timestamp: string;
  requestId?: string;
}

export class APIErrorHandler {
  private static instance: APIErrorHandler;
  private errorHandler: ErrorHandler;

  private constructor() {
    this.errorHandler = ErrorHandler.getInstance();
  }

  public static getInstance(): APIErrorHandler {
    if (!APIErrorHandler.instance) {
      APIErrorHandler.instance = new APIErrorHandler();
    }
    return APIErrorHandler.instance;
  }

  public handleAPIError(error: any, request?: NextRequest): NextResponse<APIResponse> {
    const appError = this.errorHandler.handleError(error, 'API Route');
    const userMessage = this.errorHandler.createUserFriendlyMessage(appError);

    // Determine HTTP status code
    const status = this.getHTTPStatus(error);

    const response: APIResponse = {
      success: false,
      error: userMessage,
      message: appError.message,
      code: appError.code,
      timestamp: appError.timestamp.toISOString(),
      requestId: appError.requestId
    };

    return NextResponse.json(response, { status });
  }

  public success<T>(data: T, message?: string): NextResponse<APIResponse<T>> {
    const response: APIResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response);
  }

  public validationError(errors: Record<string, string[]>): NextResponse<APIResponse> {
    const response: APIResponse = {
      success: false,
      error: 'Validation failed',
      message: 'Please check your input and try again',
      code: 'VALIDATION_ERROR',
      timestamp: new Date().toISOString(),
      data: { errors }
    };

    return NextResponse.json(response, { status: 400 });
  }

  public notFound(resource: string = 'Resource'): NextResponse<APIResponse> {
    const response: APIResponse = {
      success: false,
      error: `${resource} not found`,
      message: `The requested ${resource.toLowerCase()} was not found`,
      code: 'NOT_FOUND',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, { status: 404 });
  }

  public unauthorized(message: string = 'Unauthorized'): NextResponse<APIResponse> {
    const response: APIResponse = {
      success: false,
      error: message,
      message: 'You are not authorized to perform this action',
      code: 'UNAUTHORIZED',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, { status: 401 });
  }

  public forbidden(message: string = 'Forbidden'): NextResponse<APIResponse> {
    const response: APIResponse = {
      success: false,
      error: message,
      message: 'You do not have permission to perform this action',
      code: 'FORBIDDEN',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, { status: 403 });
  }

  public rateLimited(message: string = 'Too many requests'): NextResponse<APIResponse> {
    const response: APIResponse = {
      success: false,
      error: message,
      message: 'Please wait a moment and try again',
      code: 'RATE_LIMITED',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, { status: 429 });
  }

  public serverError(message: string = 'Internal server error'): NextResponse<APIResponse> {
    const response: APIResponse = {
      success: false,
      error: message,
      message: 'Something went wrong on our end. Please try again later',
      code: 'SERVER_ERROR',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, { status: 500 });
  }

  private getHTTPStatus(error: any): number {
    if (error instanceof APIError) {
      return error.status;
    }

    if (error instanceof ValidationError) {
      return 400;
    }

    if (error.status) {
      return error.status;
    }

    if (error.code) {
      const statusMap: Record<string, number> = {
        'VALIDATION_ERROR': 400,
        'AUTHENTICATION_ERROR': 401,
        'PERMISSION_ERROR': 403,
        'NOT_FOUND': 404,
        'RATE_LIMIT_ERROR': 429,
        'SERVER_ERROR': 500,
        'NETWORK_ERROR': 503,
        'TIMEOUT_ERROR': 504
      };

      return statusMap[error.code] || 500;
    }

    return 500;
  }
}

// Utility function to wrap API route handlers with error handling
export const withErrorHandling = (
  handler: (req: NextRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req);
    } catch (error) {
      const apiErrorHandler = APIErrorHandler.getInstance();
      return apiErrorHandler.handleAPIError(error, req);
    }
  };
};

// Utility function for async API route handlers
export const asyncHandler = (
  handler: (req: NextRequest) => Promise<NextResponse>
) => {
  return withErrorHandling(handler);
};

// Validation helper
export const validateRequest = (schema: any, data: any) => {
  try {
    return schema.parse(data);
  } catch (error) {
    throw new ValidationError('Invalid request data', 'request', data);
  }
};

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (identifier: string, limit: number = 100, windowMs: number = 15 * 60 * 1000) => {
  const now = Date.now();
  const key = identifier;
  const current = rateLimitMap.get(key);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
};
