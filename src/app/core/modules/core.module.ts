import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import SharedModule from '../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { HTTPClientService } from '../services/http.service';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [CommonModule, SharedModule],
  providers: [HTTPClientService],
  exports: [],
})
export default class CoreModule {}