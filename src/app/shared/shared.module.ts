import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';
import { SelectModule } from 'ng-select';
import { ChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ng2-img-cropper';
import { Select2Module } from 'ng2-select2';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CapitalizePipe } from './../_pipes/capitalize.pipe';
import { SortPipe } from './../_pipes/sorter.pipe';
import { DatosFacturacionComponent } from './../profile/account-setting/datos-facturacion/datos-facturacion.component';
import { RadarChartComponent } from './../profile/sidebar/radar-chart/radar-chart.component';
import { ButtonLoaderComponent } from './components-utils/button-loader/button-loader.component';
import { CropperComponent } from './components-utils/cropper/cropper.component';
import { EmptyProximamenteComponent } from './components-utils/empty-proximamente/empty-proximamente.component';
import { ErrorInputComponent } from './components-utils/error-input/error-input.component';
import { ErrorPageComponent } from './components-utils/error-page/error-page.component';
import { ParentComponent } from './components-utils/parent/parent.component';
import { PaginatorTemplateComponent } from './paginator-template/paginator-template.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { TextMaskModule } from 'angular2-text-mask';
import { ResultsActionsComponent } from './results-actions/results-actions.component';
import { SharedLinkComponent } from './components-utils/shared-link/shared-link.component';
import { MailchimpConfirmComponent } from './footer/mailchimp-confirm/mailchimp-confirm.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


registerLocaleData(localeEs);
@NgModule({
  declarations: [
    CapitalizePipe,
    SortPipe,
    RadarChartComponent,
    CropperComponent,
    ParentComponent,
    DatosFacturacionComponent,
    PaginatorTemplateComponent,
    ErrorPageComponent,
    ErrorInputComponent,
    EmptyProximamenteComponent,
    ButtonLoaderComponent,
    ResultsActionsComponent,
    MailchimpConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SelectModule,
    ChartsModule,
    Select2Module,
    StarRatingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    // NgbModule,
    ImageCropperModule,
    TextMaskModule
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CapitalizePipe,
    SortPipe,
    StarRatingModule,
    SelectModule,
    TooltipModule,
    CollapseModule,
    RadarChartComponent,
    CropperComponent,
    ChartsModule,
    ParentComponent,
    Select2Module,
    NgbModule,
    ImageCropperModule,
    TextMaskModule,
    DatosFacturacionComponent,
    ErrorPageComponent,
    PaginatorTemplateComponent,
    ErrorInputComponent,
    EmptyProximamenteComponent,
    ButtonLoaderComponent,
    NgxPageScrollModule,
    NgxHmCarouselModule,
    ResultsActionsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
