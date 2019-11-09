import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { PageAComponent }        from './app.page-a';
import { PageBComponent }        from './app.page-b';
import { OrderHistoryComponent }        from './app.order-history';
import { PageDefault }           from './app.pagedefault';

const appRoutes: Routes = [
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'component', component: AppComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
