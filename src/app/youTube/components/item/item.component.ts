import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { WholeDataCustom } from '../../../shared/types';
import { YouTubeService } from '../../services/youTube.service';
import { Store } from '@ngrx/store';
import * as YouTubeActions from '../../../redux/actions/youTube.actions';
import * as CustomVideoActions from '../../../redux/actions/videoList.actions';
import { State } from '../../../redux/state.models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item!: WholeDataCustom;
  borderColor: string = 'border-red';

  isFavorite: boolean = false;
  favoriteIconSrc: string = 'assets/images/favorite.png';

  constructor(
    private youTubeService: YouTubeService, 
    private router: Router,
    private store: Store<State>) {}

  @HostBinding('class') get color() {
    const publishDate = new Date(); //this.item.snippet.publishedAt
    let d = new Date();
    const halfYear = new Date(d.setMonth(d.getMonth() - 6));
    d = new Date();
    const monthAgo = new Date(d.setMonth(d.getMonth() - 1));
    d = new Date();
    const weekAgo = new Date(d.setDate(d.getDate() - 7));

    if (publishDate >= halfYear && publishDate <= monthAgo) {
      this.borderColor = 'border-yellow';
    }

    if (publishDate >= monthAgo && publishDate <= weekAgo) {
      this.borderColor = 'border-green';
    }

    if (publishDate >= weekAgo) {
      this.borderColor = 'border-blue';
    }

    return this.borderColor;
  }

  favoriteHandler() {
    this.item = {...this.item, favorite: this.item.favorite ? !this.item.favorite : true};
    this.store.dispatch(YouTubeActions.AddToFavorites({item: this.item}));
  }

  deleteClickHandler() {
    this.store.dispatch(CustomVideoActions.DeleteCustomVideo({id: this.item.id || ''}));
    this.store.dispatch(YouTubeActions.DeleteCustomVideo({id: this.item.id || ''}));
  }

  clickHandler() {
    this.youTubeService.setDetailId(this.item.id || '');
    this.router.navigate(['/details/:id', { id: this.item.id }]);
  }
}
