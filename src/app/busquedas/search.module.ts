import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SearchComponent } from './directorio/search.component';
import { ResultBadgeComponent } from './result-badge/result-badge.component';
import { NouisliderModule } from 'ng2-nouislider';
import { RankingComponent } from './ranking/ranking.component';
import { FiltroComponent } from './filtro/filtro.component';
import { InvoiceCheckoutComponent } from './invoice.checkout/invoice.checkout.component';
import { ShoppingCarComponent } from './shopping.car/shopping.car.component';
import { BayProfileComponent } from './bay-profile/bay-profile.component';
import { ProfileModule } from '../profile/profile.module';
import { FiltroDialogComponent } from './filtro/filtro.dialog.component';
import { IrjIndicatorModule } from '../profile/irj-indicator/irj-indicator.module';
import { MisAbogadosComponent } from './mis-abogados/mis-abogados.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmptySearchComponent } from './shared/empty-search/empty-search.component';
import { LoadingModule } from '../shared/components-utils/loading/loading.module';
import { ModalsModule } from '../shared/modals/modals.module';
import { BlockContentComponent } from './block-content/block.content.component';
import { RankingLandingComponent } from "./ranking-landing/ranking-landing.component";
import { BlockingModule } from '../profile/blocking/blocking.module';
import { NameLocationComponent } from './result-badge/shared/name-location/name-location.component';


@NgModule({
   declarations: [
      SearchComponent,
      RankingComponent,
      ResultBadgeComponent,
      FiltroComponent,
      InvoiceCheckoutComponent,
      ShoppingCarComponent,
      BayProfileComponent,
      FiltroDialogComponent,
      MisAbogadosComponent,
      EmptySearchComponent,
      BlockContentComponent,
      RankingLandingComponent,
      NameLocationComponent
   ],
   imports: [
      SharedModule,
      BlockingModule,
      ProfileModule,
      LoadingModule,
      NouisliderModule,
      AccordionModule.forRoot(),
      IrjIndicatorModule,
      NgxPaginationModule,
      ModalsModule
   ],
   exports: [
    RankingLandingComponent
   ]
})
export class SearchModule { }