import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import SharedModule from '../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { HTTPClientService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { ToastComponent } from '../components/toast/toast.component';

@NgModule({
  declarations: [PageNotFoundComponent, ToastComponent],
  imports: [CommonModule, SharedModule],
  providers: [HTTPClientService, ToastService],
  exports: [ToastComponent],
})
export default class CoreModule {}
