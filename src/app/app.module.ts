import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgPagerModule } from '../../projects/ng-pager/src/public_api';

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
