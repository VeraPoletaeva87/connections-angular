import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import AppComponent from './app.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AppRoutingModule } from './app-routing.module';
import CoreModule from './core/modules/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShortUrlInterceptor } from './youTube/services/httpInterceptor';
import { StoreModule } from '@ngrx/store';
import { customVideoReducer } from './redux/reducers/videoList.reducer';
import { EffectsModule } from '@ngrx/effects';
import { YouTubeEffects } from './redux/effects/youTube.effect';
import { youTubeReducer } from './redux/reducers/youTube.reducer';
import { DetailsEffects } from './redux/effects/details.effect';

@NgModule({
  declarations: [AppComponent, SearchPipe],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({customVideos: customVideoReducer, youTubeVideos: youTubeReducer}, {}),
    EffectsModule.forRoot([YouTubeEffects, DetailsEffects])
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, {
    provide: HTTP_INTERCEPTORS,
    useClass: ShortUrlInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export default class AppModule {}
