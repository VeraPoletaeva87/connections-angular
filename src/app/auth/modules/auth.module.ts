import { NgModule } from '@angular/core';

import { LoginPageComponent } from '../pages/login-page/login-page.component';
import SharedModule from '../../shared/modules/shared.module';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginBlockComponent } from '../components/loginBlock/loginBlock.component';

const loginRoutes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, AuthRoutingModule, LoginBlockComponent],
  exports: [],
})
export class AuthModule {}
