import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WholeDataCustom } from '../../../shared/types';
import { Store, select } from '@ngrx/store';
import * as YouTubeActions from '../../../redux/actions/youTube.actions';
import { getDetails } from 'src/app/redux/selectors/youTube.selector';
import { Subscription, switchMap, tap } from 'rxjs';
import { State } from '../../../redux/state.models';
import * as CustomVideoActions from '../../../redux/actions/videoList.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent { 
  id: string = '';
  item!: WholeDataCustom;

  isFavorite: boolean = false;
  favoriteIconSrc: string = 'assets/images/favorite.png';
  public subscription: Subscription = new Subscription;
  public detailsSubscription: Subscription = new Subscription;
  

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const item$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id') || '';
        return this.store.select(getDetails(id)).pipe(
          tap((item) => {
            if (item) {
              this.item = item;
              this.favoriteIconSrc = this.item.favorite ? 'assets/images/likesIcon.png' : 'assets/images/favorite.png';
            }
          })
        )
      })).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
  }

  favoriteHandler() {
    this.isFavorite = !this.isFavorite;
    this.item = {...this.item, favorite: this.isFavorite};
    this.store.dispatch(YouTubeActions.AddToFavorites({item: this.item}));
    this.favoriteIconSrc = this.item.favorite ? 'assets/images/likesIcon.png' : 'assets/images/favorite.png';
  }

  cardDeleteHandler() {
    this.store.dispatch(CustomVideoActions.DeleteCustomVideo({id: this.item.id || ''}));
    this.router.navigate(['/main']);
  }

  backClickHandler() {
    this.router.navigate(['/main']);
  }

}
