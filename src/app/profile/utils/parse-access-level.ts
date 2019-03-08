import { AccessLevel } from '../interfaces/profile-mode';

export function parseAccessLevel(rawLevel: number): AccessLevel {
  switch(rawLevel) {
    case 1: return AccessLevel.Essential;
    case 2: return AccessLevel.Advanced;
    case 3: return AccessLevel.Analytic;
    case 4: return AccessLevel.Owner;
    case 11: return AccessLevel.Advanced;
    case 12: return AccessLevel.Analytic;
    case 13: return AccessLevel.Owner;
    default: return AccessLevel.None;
  }
}
