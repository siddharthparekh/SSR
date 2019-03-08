import { CareerItem, FormationItem, LawyerAgency, ArticlesItem, NewsItem } from './interfaces';

export const testAboutMeText = `
  Cras turpis magna, posuere varius felis sed, volutpat fringilla velit. 
  Vestibulum semper arcu erat. Etiam metus felis, auctor vitae imperdiet eu, 
  pulvinar id orci.
`;

export const testLawyerAgency: LawyerAgency = {
   id: -1,
   name: 'Coetus iuris Legalis Justus',
   summaryText: `
    Pellentesque tempor tempus lorem. Duis rutrum elit id risus tempor 
    volutpat. Vivamus pretium maximus ex, a fringilla mi pulvinar vitae. 
    Aenean placerat tincidunt justo, ac accumsan metus hendrerit eu. 
  `,
};

export const testLanguages = ['Castellano', 'Gallego', 'Inglés'];

export const testCareerItem: CareerItem = {
   post: 'Causidicus Legisperitus',
   agency: { name: 'Pax Et Bonum', id: null },
   from: new Date(2016, 0, 1),
   to: null,
   location: 'Mundus',
   summaryText: `
    Donec vulputate cursus turpis. Sed id est nec nulla elementum vestibulum.
  `,
};

export const testFormationItem: FormationItem = {
   institution: 'Alma Mater',
   certification: 'Gaudeamus Igitur Iuvenes dum Sumus',
   from: new Date(2011, 0, 1),
   to: new Date(2016, 0, 1),
};

export const testArticlesItem: ArticlesItem = {
   title: 'Inteligencia Artificial y despachos de abogados.',
   summary: 'Supongamos una operación de compraventa de una empresa: Due Diligence, reuniones…',
};

export const testNewsItem: NewsItem = {
   title: 'Inteligencia Artificial y despachos de abogados.',
   summary: 'Supongamos una operación de compraventa de una empresa: Due Diligence, reuniones…',
   imageUrl: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2501d73697239f0d5569c4cf39477389&auto=format&fit=crop&w=1200&q=60',
}
