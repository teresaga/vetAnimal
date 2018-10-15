import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { TiendaComponent } from './tienda/tienda/tienda.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
	//{path: '', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'clientes', component: ClientesComponent},
	{path: 'tienda', component: TiendaComponent},
	{path: '**', component: HomeComponent}//Carga el componente si la ruta falla o tratamos de cargar una pagina que no existe
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);