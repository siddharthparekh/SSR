import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileRedirectComponent } from './profile-redirect.component';

const moduloProfileRoutes: Routes = [
   { path: 'abogado/:token', component: ProfileRedirectComponent },
   { path: 'despacho/:token', component: ProfileRedirectComponent },
   { path: 'abogado-int/:token', component: ProfileComponent },
   { path: 'despacho-int/:token', component: ProfileComponent },
];

@NgModule({
   imports: [
      RouterModule.forChild(moduloProfileRoutes),
   ]
})
export class ProfileRoutingModule { }
