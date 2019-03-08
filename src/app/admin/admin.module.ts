import { PanelSentenciasComponent } from './panel-sentencias/panel-sentencias.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { AdminSentenciasComponent } from './admin-sentencias/admin-sentencias.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { FormsModule } from '@angular/forms';
import { AdminProfilesComponent } from './admin-profiles/admin-profiles.component';
import { AdminArbolComponent } from './admin-arbol/admin-arbol.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ContextMenuModule } from 'ngx-contextmenu';


@NgModule({
  declarations: [
  PanelSentenciasComponent,
  AdminSentenciasComponent,
  AdminPanelComponent,
  AdminUsuariosComponent,
  AdminProfilesComponent,
  AdminArbolComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    NgxGraphModule,
    ContextMenuModule.forRoot() 
  ]
})
export class AdminModule { }
