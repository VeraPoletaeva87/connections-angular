import { Component } from '@angular/core';
import * as YouTube from '../../../redux/actions/youTube.actions';
import { Store, select } from '@ngrx/store';
import { getItems } from '../../../redux/selectors/youTube.selector';
import { State } from '../../../redux/state.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {

  items$ = this.store
  .pipe(
    select((state) => getItems(state))
  )

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(YouTube.LoadItems());
  }

}
