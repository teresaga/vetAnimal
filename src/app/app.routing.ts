import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ClientsComponent } from './clients/clients/clients.component';
import { ShopComponent } from './shop/shop/shop.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
	//{path: '', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'clientes', component: ClientsComponent},
	{path: 'tienda', component: ShopComponent},
	{path: '**', component: HomeComponent}//Carga el componente si la ruta falla o tratamos de cargar una pagina que no existe
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);