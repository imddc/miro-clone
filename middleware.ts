import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 受保护的路由
const isProtectedRoute = createRouteMatcher(['/(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
