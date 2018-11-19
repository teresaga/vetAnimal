import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routing';
 
import { SharedModule } from '../shared/shared.module';

import { ClientsComponent } from './clients/clients/clients.component';
import { ShopComponent } from './shop/shop/shop.component';
import { AnimalsComponent } from './animals/animals/animals.component';
import { AddanimalComponent } from './animals/addanimal/addanimal.component';
import { WorkersComponent } from './workers/workers/workers.component';
import { AddworkerComponent } from './workers/addworker/addworker.component';
import { ProvidersComponent } from './providers/providers/providers.component';
import { ProductsComponent } from './products/products/products.component';
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

import { SearchWorkerPipe } from './pipes/search-worker.pipe';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { AddjobComponent } from './jobs/addjob/addjob.component';
import { EditworkerComponent } from './workers/editworker/editworker.component';
import { DetailsworkerComponent } from './workers/detailsworker/detailsworker.component';
import { SearchProductPipe } from './pipes/search-product.pipe';
import { SearchProviderPipe } from './pipes/search-provider.pipe';
import { SearchClientPipe } from './pipes/search-client.pipe';
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
    ProvidersComponent,
    WorkersComponent,
    AddworkerComponent,
    AnimalsComponent,
    AddanimalComponent,
    ShopComponent,
    ClientsComponent,
    SearchWorkerPipe,
    JobsComponent,
    AddjobComponent,
    EditworkerComponent,
    DetailsworkerComponent,
    SearchProductPipe,
    SearchProviderPipe,
    SearchClientPipe
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PAGES_ROUTES,
    NgbModalModule.forRoot()
  ],
  exports: [
      HomeComponent,
  ],
  providers: [
    UserService
  ]
})
export class PagesModule { }
