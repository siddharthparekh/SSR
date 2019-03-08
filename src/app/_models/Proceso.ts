import { IOrganoJudicial, OrganoJudicial } from "./OrganoJudicial";

export interface IProceso {
   numeroProceso: string;
   numeroSeccion: string;
   OrganoJudicial: IOrganoJudicial;
}

export class Proceso implements IProceso {
   numeroProceso: string;
   numeroSeccion: string;
   OrganoJudicial: IOrganoJudicial;

   constructor(o) {
      this.numeroProceso = o.numeroProceso;
      this.numeroSeccion = o.numeroSeccion;
      this.OrganoJudicial = o.OrganosJudiciale ?
         new OrganoJudicial(o.OrganosJudiciale) : new OrganoJudicial({ id: o.OrganosJudicialeId });
   }
}