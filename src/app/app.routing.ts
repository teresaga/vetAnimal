import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
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
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
	//{path: '', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'home', component: HomeComponent},
	{path: 'clientes', component: ClientsComponent},
	{path: 'tienda', component: ShopComponent},
	{path: 'animales', component: AnimalsComponent},
	{path: 'empleados', component: WorkersComponent},
	{path: 'proveedores', component: ProvidersComponent},
	{path: 'productos', component: ProductsComponent},
	{path: 'usuarios', component: UsersComponent},
	{path: 'consultas', component: ConsultationsComponent},
	{path: 'actividades', component: ActivitiesComponent},
	{path: 'configuracion', component: SettingsComponent},
	{path: 'informes', component: ReportsComponent},
	{path: '**', component: HomeComponent}//Carga el componente si la ruta falla o tratamos de cargar una pagina que no existe
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);