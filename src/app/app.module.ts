import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { EstructuraComponent } from './estructura/estructura.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddclientesComponent } from './clientes/addclientes/addclientes.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { TiendaComponent } from './tienda/tienda/tienda.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    EstructuraComponent,
    LoginComponent,
    HomeComponent,
    AddclientesComponent,
    ClientesComponent,
    TiendaComponent
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
