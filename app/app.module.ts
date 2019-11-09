import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent }   from './app.component';
import { PageDefault }    from './app.pagedefault';
import { PageAComponent } from './app.page-a';
import { PageBComponent } from './app.page-b';
import { OrderHistoryComponent } from './app.order-history';
import { routing }        from './app.routing';
import {ChildComponent } from './app.child';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';




@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,routing, HttpClientModule,RouterModule],
    declarations: [AppComponent, PageDefault,
        PageAComponent, PageBComponent, ChildComponent, OrderHistoryComponent],
        providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }

