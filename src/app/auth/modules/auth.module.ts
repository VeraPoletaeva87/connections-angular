import { NgModule } from '@angular/core';

import { RegisterPageComponent } from '../pages/registration/form.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { LoginPageComponent } from '../pages/signin-page/form.component';
import SharedModule from '../../shared/modules/shared.module';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginBlockComponent } from '../components/loginBlock/loginBlock.component';

const loginRoutes: Routes = [{ path: '', component: RegisterPageComponent }];

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent, ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule,
    LoginBlockComponent,
  ],
  exports: [],
})
export class AuthModule {}