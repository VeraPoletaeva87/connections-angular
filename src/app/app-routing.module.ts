import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { LoginPageComponent } from './auth/pages/signin-page/form.component';
import { ProfileComponent } from './auth/pages/profile/profile.component';
import { ConversationComponent } from './connections/pages/conversation/conversation.component';
import { GroupComponent } from './connections/pages/group/group.component';
import { authGuard } from './connections/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'conversation/:id', component: ConversationComponent, canActivate: [authGuard] },
  { path: 'group/:id', component: GroupComponent, canActivate: [authGuard] },
  {
    path: 'signup',
    loadChildren: () =>
      import('./auth/modules/auth.module').then((m) => m.AuthModule),
  },
  { path: 'signin', component: LoginPageComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'main',
    loadChildren: () =>
      import('./connections/modules/connections.module').then(
        (m) => m.ConnectionsModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}