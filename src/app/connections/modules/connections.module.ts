import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import SharedModule from '../../shared/modules/shared.module';
import { MainComponent } from '../pages/main/main.component';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.modules';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ConnectionsRoutingModule,
  ],
})
export class YouTubeModule {}