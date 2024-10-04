import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartPageComponent } from './pages/chart/chart-page.component';
import { ManageVotesPageComponent } from './pages/manage-votes/manage-votes-page.component';
import { MainPageComponent } from './pages/main/main-page.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainPageComponent,
        data: {
            title: 'What do you wanna do?'
        }
    },
    {
        path: 'chart/:poll_id',
        component: ChartPageComponent,
        data: {
            title: 'Chart'
        }
    },
    {
        path: 'settings/:poll_id',
        component: ManageVotesPageComponent,
        data: {
            title: 'Settings'
        }
    },
    {
        path: '**',
        redirectTo: 'main',
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class DashboardRoutingModule { }
