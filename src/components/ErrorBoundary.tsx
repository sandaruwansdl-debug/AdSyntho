'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorHandler, ErrorBoundary as ErrorBoundaryClass } from '../lib/error-handler';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  private errorHandler: ErrorHandler;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
    this.errorHandler = ErrorHandler.getInstance();
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorBoundaryError = new ErrorBoundaryClass(
      error.message,
      errorInfo.componentStack || '',
      errorInfo
    );

    this.errorHandler.handleError(errorBoundaryError, 'React Error Boundary');
    
    this.setState({
      error,
      errorInfo
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We're sorry, but something unexpected happened. Our team has been notified.
              </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    What happened?
                  </h3>
                  <p className="text-sm text-gray-600">
                    An error occurred while rendering this page. This could be due to:
                  </p>
                  <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>A temporary network issue</li>
                    <li>An unexpected data format</li>
                    <li>A bug in our application</li>
                  </ul>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="text-sm font-medium text-red-800 mb-2">
                      Development Error Details:
                    </h4>
                    <pre className="text-xs text-red-700 overflow-x-auto">
                      {this.state.error.message}
                    </pre>
                    {this.state.errorInfo && (
                      <details className="mt-2">
                        <summary className="text-xs text-red-600 cursor-pointer">
                          Component Stack
                        </summary>
                        <pre className="text-xs text-red-700 mt-1 overflow-x-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={this.handleRetry}
                    className="btn-primary flex items-center justify-center"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    Try Again
                  </button>
                  
                  <button
                    onClick={this.handleReload}
                    className="btn-secondary flex items-center justify-center"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    Reload Page
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    If the problem persists, please{' '}
                    <a 
                      href="mailto:support@adsyntho.com" 
                      className="text-primary-600 hover:text-primary-500"
                    >
                      contact support
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for handling errors in functional components
export const useErrorHandler = () => {
  const errorHandler = ErrorHandler.getInstance();

  const handleError = (error: any, context?: string) => {
    const appError = errorHandler.handleError(error, context);
    return errorHandler.createUserFriendlyMessage(appError);
  };

  return { handleError };
};

// Higher-order component for error handling
export const withErrorHandling = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};
