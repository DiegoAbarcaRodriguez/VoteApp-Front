import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotesPageComponent } from './pages/votes/votes.component';
import { ChartPageComponent } from './pages/chart/chart-page.component';
import { ManageVotesPageComponent } from './pages/manage-votes/manage-votes-page.component';

const routes: Routes = [
    {
        path: 'vote',
        component: VotesPageComponent,
        data: {
            title: 'Vote'
        }
    },
    {
        path: 'chart',
        component: ChartPageComponent,
        data: {
            title: 'Chart'
        }
    },
    {
        path: 'settings',
        component: ManageVotesPageComponent,
        data: {
            title: 'Settings'
        }
    },
    {
        path: '**',
        redirectTo: 'vote',
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class DashboardRoutingModule { }
