import { ActivatedRoute } from '@angular/router';

import { AccessMode, ProfileMode } from '../interfaces/profile-mode';

export function parseProfileMode(route: ActivatedRoute): ProfileMode {
   const url = route.snapshot.url;
   /*const typeSegment = url[0];
   if (typeSegment.path.match(/^abogado/i)) {
     console.log('profile abogado');
   } else if (typeSegment.path.match(/^despacho/i)) {
     console.log('profile despacho');
   } else {
     console.log('profile unknown');
   }*/
   const payloadSegment = url[1];
   const payloadParts = payloadSegment.path.split('-');
   const payloadLength = payloadParts.length;

   let identifier: number | string;
   let accessMode: AccessMode;
   if (payloadLength === 1) {
      accessMode = AccessMode.Ranking;
      identifier = payloadParts[0];
   } else {
      accessMode = AccessMode.Directory;
      identifier = +payloadParts[payloadLength - 1];
   }
   return { accessMode, identifier };
}
