import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgPagerModule } from 'projects/ng-pager/src/public_api';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        NgPagerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
