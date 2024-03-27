// export function middleware(request) {
//     const currentUser = request.cookies.get('currentUser')?.value

//     if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//       return Response.redirect(new URL('/dashboard', request.url))
//     }
   
//     if (currentUser == undefined && !request.nextUrl.pathname.startsWith('/login')) {
//       return Response.redirect(new URL('/login', request.url))
//     }
//   }
   
//   export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
//   }


// middleware.js
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
    matcher: '/ac/:path*',
    
  };