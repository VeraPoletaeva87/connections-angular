import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import SharedModule from '../../shared/modules/shared.module';
import { MainComponent } from '../pages/main/main.component';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from '../components/groupList/list.component';
import { DialogComponent } from '../components/createGroup/dialog.component';
import { ConfirmationComponent } from '../components/confirmation/dialog.component';
import { CountdownService } from '../services/countdown.service';
import { PeopleListComponent } from '../components/peopleList/list.component';
import { ConversationComponent } from '../pages/conversation/conversation.component';
import { GroupComponent } from '../pages/group/group.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    ConversationComponent,
    DialogComponent,
    GroupComponent,
    ListComponent,
    MainComponent,
    PeopleListComponent
  ],
  providers: [DatePipe, CountdownService],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ConnectionsRoutingModule,
  ],
})
export class ConnectionsModule {}