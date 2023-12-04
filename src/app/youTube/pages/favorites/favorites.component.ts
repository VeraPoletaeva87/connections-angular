import { Component } from '@angular/core';
import { WholeDataCustom } from '../../../shared/types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { State } from '../../../redux/state.models';
import { Store } from '@ngrx/store';
import { getItems } from 'src/app/redux/selectors/favorites.selector';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoriteComponent {
  items$: Observable<WholeDataCustom[]> = this.store.select(getItems);;

  constructor(private router: Router, private store: Store<State>) {}

  backClickHandler() {
    this.router.navigate(['/main']);
  }

}
