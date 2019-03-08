import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { BlockingModule } from '../../blocking/blocking.module';
import { ErrorModule } from '../../error/error.module';
import { LoadingModule } from '../../../shared/components-utils/loading/loading.module';
import { AboutComponent } from './about.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LawyerAgencyComponent } from './lawyer-agency/lawyer-agency.component';
import { LanguagesComponent } from './languages/languages.component';
import { CareerComponent } from './career/career.component';
import { CareerItemComponent } from './career/career-item/career-item.component';
import { FormationComponent } from './formation/formation.component';
import { FormationItemComponent } from './formation/formation-item/formation-item.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesItemComponent } from './articles/articles-item/articles-item.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { AboutService } from './about.service';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './../../../shared/shared.module';
import { FormationForm } from './formation/formation-form/formation-form.component';
import { CreateFormation } from './formation/create-formation/create-formation';
import { EditFormation } from './formation/edit-formation/edit-formation.component';
import { CareerFormComponent } from './career/career-form/career-form.component';
import { CreateCareerComponent } from './career/create-career/create-career';
import { EditCareerComponent } from './career/edit-career/edit-career.component';

@NgModule({
   imports: [
      SharedModule,
      CommonModule,
      BlockingModule,
      ErrorModule,
      LoadingModule,
      QuillModule,
      NguiAutoCompleteModule
   ],
   declarations: [
      AboutComponent,
      AboutMeComponent,
      LawyerAgencyComponent,
      LanguagesComponent,
      CareerComponent,
      CareerItemComponent,
      FormationComponent,
      FormationItemComponent,
      ArticlesComponent,
      ArticlesItemComponent,
      NewsComponent,
      NewsItemComponent,
      FormationForm,
      CreateFormation,
      EditFormation,
      CareerFormComponent,
      CreateCareerComponent,
      EditCareerComponent

   ],
   exports: [
      AboutComponent,
   ],
   providers: [
      AboutService,
   ],
})
export class AboutModule { }
