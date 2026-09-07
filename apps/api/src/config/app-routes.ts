/**
 * Central route registry. Static/reserved paths must be registered before
 * parameterized ones so Nest's router doesn't shadow them.
 */
export const routesV1 = {
  ping: 'ping'
} as const;
