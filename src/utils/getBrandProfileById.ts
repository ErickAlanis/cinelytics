import { brandProfiles } from '../constants/brandProfiles';
import type { BrandId, BrandProfile } from '../types/brand';

export function getBrandProfileById(id: BrandId): BrandProfile | undefined {
  return brandProfiles.find((profile) => profile.id === id);
}
