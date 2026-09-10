/**
 * Shapes are left as `unknown`/`Record<string, unknown>` on purpose: the
 * exact Apimo response fields haven't been observed against a real token
 * yet. Type them precisely once we've inspected a live response.
 */
export abstract class ApimoClient {
  abstract listAgencies(): Promise<unknown>;
  abstract listProperties(
    agencyId: number,
    query?: Record<string, string | number>
  ): Promise<unknown>;
  abstract createLead(agencyId: number, payload: Record<string, unknown>): Promise<unknown>;
}
