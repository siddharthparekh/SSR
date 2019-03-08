import { TariffsGroup } from './interfaces';

export const testTariffsGroup1: TariffsGroup = { 
  name: 'Consultas Online',
  items: [
    {
      title: 'Consulta simple',
      price: NaN,
    },
    {
      title: 'Consulta compleja',
      price: NaN,
    },
    {
      title: 'Consulta muy compleja',
      price: NaN,
    },
  ],
};

export const testTariffsGroup2: TariffsGroup = {
  name: 'Cita presencial',
  items: [
    {
      title: 'Primera consulta',
      price: NaN,
    },
  ],
};
