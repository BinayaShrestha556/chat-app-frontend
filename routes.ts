/**
 * an array of routes that are assesable to the public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/auth/new-verification"];
/**
 * an array of routes that are used for authentication
 * these routes will redirect logged in users to /settings
 * @type{stirng[]}
 */
export const redirectToDashboardRoute = ["/"];
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/change-password",
  "/auth/change-password/change",
  "/auth/test",
  "/auth/users/login",
  "/auth/users/register",
];
/**
 * the prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string[]}
 */

export const apiAuthPrefix = "/api";
/**
 * the default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
