import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import SharedModule from '../../shared/modules/shared.module';
import { DetailsComponent } from '../pages/details/details.component';
import { ListComponent } from '../pages/list/list.component';
import { ItemComponent } from '../components/item/item.component';
import { FavoriteComponent } from '../pages/favorites/favorites.component';
import { CommonModule } from '@angular/common';
import { YouTubeRoutingModule } from './youTube-routing.module';
import { CreateCardComponent } from '../pages/cardCreationForm/card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateCardComponent, DetailsComponent, ListComponent, ItemComponent, FavoriteComponent],
  providers: [DatePipe],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, YouTubeRoutingModule],
})
export class YouTubeModule {}