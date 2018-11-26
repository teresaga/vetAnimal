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
import { WorkersComponent } from './workers/workers/workers.component';
import { ProvidersComponent } from './providers/providers/providers.component';
import { ProductsComponent } from './products/products/products.component';
import { UsersComponent } from './users/users/users.component';
import { ConsultationsComponent } from './consultations/consultations/consultations.component';
import { ActivitiesComponent } from './activities/activities/activities.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { HomeComponent } from './home/home.component';

import { UserService } from '../services/user.service';

import { SearchWorkerPipe } from './pipes/search-worker.pipe';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { SearchProductPipe } from './pipes/search-product.pipe';
import { SearchProviderPipe } from './pipes/search-provider.pipe';
import { SearchClientPipe } from './pipes/search-client.pipe';
import { SearchSubmodelsPipe } from './pipes/search-submodels.pipe';
import { SearchUsersPipe } from './pipes/search-users.pipe';
import { CharactersComponent } from './characters/characters/characters.component';
import { HairsComponent } from './hairs/hairs/hairs.component';
import { MeasurementunitsComponent } from './measurementunits/measurementunits/measurementunits.component';
import { RacesComponent } from './races/races/races.component';
import { SpeciesComponent } from './species/species/species.component';
import { HabitatsComponent } from './habitats/habitats/habitats.component';
import { DatesPipe } from './pipes/dates.pipe';
import { DatetimePipe } from './pipes/datetime.pipe';
@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ReportsComponent,
    SettingsComponent,
    ActivitiesComponent,
    ConsultationsComponent,
    UsersComponent,
    ProductsComponent,
    ProvidersComponent,
    WorkersComponent,
    AnimalsComponent,
    ShopComponent,
    ClientsComponent,
    SearchWorkerPipe,
    JobsComponent,
    SearchProductPipe,
    SearchProviderPipe,
    SearchClientPipe,
    SearchSubmodelsPipe,
    SearchUsersPipe,
    CharactersComponent,
    HairsComponent,
    MeasurementunitsComponent,
    RacesComponent,
    SpeciesComponent,
    HabitatsComponent,
    DatesPipe,
    DatetimePipe
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
