import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import SharedModule from '../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { LoginBlockComponent } from '../../auth/components/loginBlock/loginBlock.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [CommonModule, SharedModule, LoginBlockComponent],
  exports: [],
})
export default class CoreModule {}