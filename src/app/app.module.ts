import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import AppComponent from './app.component';
import { AppRoutingModule } from './app-routing.module';
import CoreModule from './core/modules/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userInfoReducer } from './redux/reducers/userInfo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { groupInfoReducer } from './redux/reducers/groups.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ userInfo: userInfoReducer, groupInfo: groupInfoReducer }, {}),
    EffectsModule.forRoot(),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export default class AppModule {}