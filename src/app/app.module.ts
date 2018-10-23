import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients/clients.component';
import { ShopComponent } from './shop/shop/shop.component';
import { AnimalsComponent } from './animals/animals/animals.component';
import { WorkersComponent } from './workers/workers/workers.component';
import { AddworkerComponent } from './workers/addworker/addworker.component';
import { AddanimalComponent } from './animals/addanimal/addanimal.component';
import { AddclientComponent } from './clients/addclient/addclient.component';
import { ProvidersComponent } from './providers/providers/providers.component';
import { AddproviderComponent } from './providers/addprovider/addprovider.component';
import { ProductsComponent } from './products/products/products.component';
import { AddproductComponent } from './products/addproduct/addproduct.component';
import { UsersComponent } from './users/users/users.component';
import { AdduserComponent } from './users/adduser/adduser.component';
import { HeaderComponent } from './header/header.component';
import { ConsultationsComponent } from './consultations/consultations/consultations.component';
import { AddconsultationComponent } from './consultations/addconsultation/addconsultation.component';
import { ActivitiesComponent } from './activities/activities/activities.component';
import { AddactivityComponent } from './activities/addactivity/addactivity.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ClientsComponent,
    ShopComponent,
    AnimalsComponent,
    WorkersComponent,
    AddworkerComponent,
    AddanimalComponent,
    AddclientComponent,
    ProvidersComponent,
    AddproviderComponent,
    ProductsComponent,
    AddproductComponent,
    UsersComponent,
    AdduserComponent,
    HeaderComponent,
    ConsultationsComponent,
    AddconsultationComponent,
    ActivitiesComponent,
    AddactivityComponent,
    SettingsComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
