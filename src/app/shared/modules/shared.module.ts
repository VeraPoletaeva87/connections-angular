import { NgModule } from '@angular/core';

import { ButtonComponent } from '../../core/components/button/button.component';
import { ToastComponent } from '../../core/components/toast/toast.component';

@NgModule({
  declarations: [ButtonComponent, ToastComponent],
  imports: [],
  exports: [ButtonComponent, ToastComponent],
})
export default class SharedModule {}