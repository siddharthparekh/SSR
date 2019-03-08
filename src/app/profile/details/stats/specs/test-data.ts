import { 
  CasesData, RankingData, SpecClientsData, SuccessRateData, LineChartItem, SubjectsDataItem,
} from './interfaces';

export const testRankingData: RankingData = {
  placeNational: 55,
  placeCommunity: 33,
  placeProvincial: 11,
  nation: "España",
  comunity: "Galicia",
  province: "Coruña, A",
  antiguedad: 24
}

export const testSubjectsData: SubjectsDataItem[] = [
  {
    name: 'Derecho civil',
    children: [
      {
        name: 'Derecho individual y familiar',
      },
      {
        name: 'Derecho inmobiliario y de la construcción',
      },
      {
        name: 'Procedimientos de ejecución civil',
        children: [
          {
            name: 'Alquiler correcto',
          },
        ],
      },
      {
        name: 'Ley de propiedad de condominio y propiedad',
        children: [
          {
            name: 'Ley de responsabilidad',
          },
          {
            name: 'Ley de sucesión',
          },
        ],
      },
    ],
  },
];

export const testCasesData: CasesData = {
  analyzed: 100,
  media: 33,
  //analyzed: 0,
  //media: 0,
};

export const testClientsData: SpecClientsData = {
  demanded: {
    individual: 62,
    company: 12,
    //individual: 0,
    //company: 0,
  },
  demanding: {
    individual: 37,
    company: 27,
    //individual: 0,
    //company: 0,
  },
}

export const testSuccessRateData: SuccessRateData = {
  simple: {
    value: 0.2,
    mediaValue: 0.342,
    //value: 0,
    //mediaValue: 0,
  },
  company: {
    value: 0.281234,
    mediaValue: 0.356,
    //value: 0,
    //mediaValue: 0,
  },
  individual: {
    value: 0.29,
    mediaValue: 0.361,
    //value: 0,
    //mediaValue: 0,
  },
}

export const testEvolutionCasesData: LineChartItem[] = [
  {
    year: 2014,
    global: 22,
    media: 12,
  },
  {
    year: 2015,
    global: 23,
    media: 14,
  },
  {
    year: 2016,
    global: 23,
    media: 16,
  },
  {
    year: 2017,
    global: 24,
    media: 17,
  },
  {
    year: 2018,
    global: 25,
    media: 16,
  },
];

export const testResultsData: LineChartItem[] = [
  {
    year: 2015,
    global: 23,
    media: 14,
  },
  {
    year: 2016,
    global: 23,
    media: 16,
  },
  {
    year: 2017,
    global: 24,
    media: 17,
  },
  {
    year: 2018,
    global: 25,
    media: 16,
  },
];
