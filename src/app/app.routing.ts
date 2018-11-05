import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: '**', component: LoginComponent}//Carga el componente si la ruta falla o tratamos de cargar una pagina que no existe
];

export const appRoutingProviders: any[] = [];
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
