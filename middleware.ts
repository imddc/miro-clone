// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { authMiddleware } from '@clerk/nextjs/server'

// 受保护的路由
// const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up'])
//
// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect()
//   }
// })
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ['/']
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
