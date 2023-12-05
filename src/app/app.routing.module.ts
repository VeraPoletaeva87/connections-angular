import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './youTube/pages/details/details.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { CreateCardComponent } from './youTube/pages/cardCreationForm/card.component';
import { LoginPageComponent } from './auth/pages/signin-page/form.component';

const routes: Routes = [
  { path: 'details/:id', component: DetailsComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () =>
      import('./auth/modules/auth.module').then((m) => m.AuthModule),
  },
  { path: 'signin', component: LoginPageComponent },
  {
    path: 'main',
    loadChildren: () =>
      import('./youTube/modules/youTube.module').then((m) => m.YouTubeModule),
  },
  {
    path: 'create-card',
    component: CreateCardComponent,
  },
  {
    path: 'favorites',
    component: FavoriteComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}