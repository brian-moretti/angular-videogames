import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GaugeModule } from 'angular-gauge';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component'
import { HttpHeadersInterceptors } from './interceptors/http-headers.interceptors';
import { HttpErrorsInterceptors } from './interceptors/http-errors.interceptors';
import { DetailsComponent } from './components/details/details.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    DetailsComponent,
    GameTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    GaugeModule.forRoot(),
    HttpClientModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptors, multi: true}, {provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptors, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
