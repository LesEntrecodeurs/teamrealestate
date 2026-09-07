export {};

declare global {
  namespace Express {
    interface Request {
      // Populated by future auth middleware — e.g. `user?: AuthenticatedUser`
    }
  }
}
