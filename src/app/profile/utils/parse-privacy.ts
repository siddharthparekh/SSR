import { Privacy } from "../interfaces/profile-mode";

export function parsePrivacy(rawPrivacy: any): Privacy {
   return {
      irj: undefined,
      profile: rawPrivacy.profile
   };
}