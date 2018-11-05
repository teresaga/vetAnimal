import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routing';

import { SharedModule } from '../shared/shared.module';

import { ClientsComponent } from './clients/clients/clients.component';
import { AddclientComponent } from './clients/addclient/addclient.component';
import { ShopComponent } from './shop/shop/shop.component';
import { AnimalsComponent } from './animals/animals/animals.component';
import { AddanimalComponent } from './animals/addanimal/addanimal.component';
import { WorkersComponent } from './workers/workers/workers.component';
import { AddworkerComponent } from './workers/addworker/addworker.component';
import { ProvidersComponent } from './providers/providers/providers.component';
import { AddproviderComponent } from './providers/addprovider/addprovider.component';
import { ProductsComponent } from './products/products/products.component';
import { AddproductComponent } from './products/addproduct/addproduct.component';
import { UsersComponent } from './users/users/users.component';
import { AdduserComponent } from './users/adduser/adduser.component';
import { ConsultationsComponent } from './consultations/consultations/consultations.component';
import { AddconsultationComponent } from './consultations/addconsultation/addconsultation.component';
import { ActivitiesComponent } from './activities/activities/activities.component';
import { AddactivityComponent } from './activities/addactivity/addactivity.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { HomeComponent } from './home/home.component';

import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ReportsComponent,
    SettingsComponent,
    ActivitiesComponent,
    AddactivityComponent,
    ConsultationsComponent,
    AddconsultationComponent,
    UsersComponent,
    AdduserComponent,
    ProductsComponent,
    AddproductComponent,
    ProvidersComponent,
    AddproviderComponent,
    WorkersComponent,
    AddworkerComponent,
    AnimalsComponent,
    AddanimalComponent,
    ShopComponent,
    ClientsComponent,
    AddclientComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    PAGES_ROUTES
  ],
  exports: [
      HomeComponent,
  ],
  providers: [
    UserService
  ]
})
export class PagesModule { }
