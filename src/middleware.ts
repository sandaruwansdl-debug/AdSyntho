// Middleware disabled for demo mode - no authentication required
export default function middleware(req: any) {
  // No authentication checks - allow all access
  return
}

export const config = {
  matcher: []
}
