import { NgModule } from '@angular/core';

import { RegisterPageComponent } from '../pages/registration/form.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { LoginPageComponent } from '../pages/signin-page/form.component';
import SharedModule from '../../shared/modules/shared.module';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import CoreModule from 'src/app/core/modules/core.module';

const loginRoutes: Routes = [{ path: '', component: RegisterPageComponent }];

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent, ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    AuthRoutingModule,
  ],
  exports: [],
})
export class AuthModule {}