import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function ValidateCoherentDate(control: AbstractControl) {
  const fechaHoy = moment().utc().format('YYYY-MM');
  //se non existe fecha inicio CHAO
  if (!(control.value.fechaInicio)) return { coherentDate: true };
  //se existe pasamola a Moment
  const fechaInicio = moment().year(control.value.fechaInicio.year).month(parseInt(control.value.fechaInicio.month)-1).utc().format('YYYY-MM');
  if ((control.value.periodo_end_actualidad_exp || control.value.periodo_end_actualidad_edu) && (fechaInicio <= fechaHoy)) {
    return null;
  }
  //se existe fechaFin comprobamos que sexa igual ou maior a fecha Inicio
  if (control.value.fechaFin) {
    const fechaFin = moment().year(control.value.fechaFin.year).month(parseInt(control.value.fechaFin.month)-1).utc().format('YYYY-MM');
    return (fechaFin >= fechaInicio && fechaFin <= fechaHoy) ? null : { coherentDate: true };
  }
  return { coherentDate: true };
}
