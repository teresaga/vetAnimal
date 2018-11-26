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


import { LoginGuard} from '../services/guards/login.guard';
import { AdminGuard} from '../services/guards/admin.guard';
import { VetGuard} from '../services/guards/vet.guard';
import { CajeroGuard} from '../services/guards/cajero.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            {path: 'home', component: HomeComponent},
	        {path: 'clientes', component: ClientsComponent},
            {path: 'tienda', component: ShopComponent},
            {path: 'animales', component: AnimalsComponent},
            {path: 'empleados', component: WorkersComponent , canActivate: [VetGuard]},
            {path: 'proveedores', component: ProvidersComponent , canActivate: [VetGuard]},
            {path: 'productos', component: ProductsComponent , canActivate: [VetGuard]},
            {path: 'usuarios', component: UsersComponent, canActivate: [AdminGuard]},
            {path: 'consultas', component: ConsultationsComponent, canActivate: [VetGuard]},
            {path: 'actividades', component: ActivitiesComponent},
            {path: 'configuracion', component: SettingsComponent},
            {path: 'informes', component: ReportsComponent, canActivate: [AdminGuard]},
            {path: 'puestos', component: JobsComponent, canActivate: [AdminGuard]},
            {path: 'tipos-pelo', component: HairsComponent, canActivate: [AdminGuard]},
            {path: 'caracter', component: CharactersComponent, canActivate: [AdminGuard]},
            {path: 'habitat', component: HabitatsComponent, canActivate: [AdminGuard]},
            {path: 'especies', component: SpeciesComponent, canActivate: [AdminGuard]},
            {path: 'razas', component: RacesComponent, canActivate: [AdminGuard]},
            {path: 'unidades', component: MeasurementunitsComponent, canActivate: [AdminGuard]},
            {path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );