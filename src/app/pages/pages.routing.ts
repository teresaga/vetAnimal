import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
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
import { JobsComponent } from './jobs/jobs/jobs.component';
import { CharactersComponent } from './characters/characters/characters.component';
import { HairsComponent } from './hairs/hairs/hairs.component';
import { MeasurementunitsComponent } from './measurementunits/measurementunits/measurementunits.component';
import { RacesComponent } from './races/races/races.component';
import { SpeciesComponent } from './species/species/species.component';
import { HabitatsComponent } from './habitats/habitats/habitats.component';
import { HomeComponent } from './home/home.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
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
            {path: 'puestos', component: JobsComponent},
            {path: 'tipos-pelo', component: HairsComponent},
            {path: 'caracter', component: CharactersComponent},
            {path: 'habitat', component: HabitatsComponent},
            {path: 'especies', component: SpeciesComponent},
            {path: 'razas', component: RacesComponent},
            {path: 'unidades', component: MeasurementunitsComponent},
            {path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );