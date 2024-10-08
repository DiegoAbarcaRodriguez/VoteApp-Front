import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChartPageComponent } from './pages/chart/chart-page.component';
import { ManageVotesPageComponent } from './pages/manage-votes/manage-votes-page.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { MainPageComponent } from './pages/main/main-page.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ],
    exports: [],
    declarations: [
        ChartPageComponent,
        ManageVotesPageComponent,
        MainPageComponent,
        DashboardLayoutComponent
    ],
    providers: [],
})
export class DashboardModule { }
