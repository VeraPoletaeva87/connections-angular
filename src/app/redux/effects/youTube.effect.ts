import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { YouTubeService } from '../../youTube/services/youTube.service';
import * as YouTube from '../actions/youTube.actions';
 
@Injectable()
export class YouTubeEffects {
  loadYouTubeItems$ = createEffect(() =>
  this.actions$
    .pipe(
      ofType(YouTube.LoadItems),
      mergeMap(() => 
      this.youTubeService.getItems$()
        .pipe(
          map(items => (YouTube.LoadItemsSuccess({items})))
        ))
      )
  );
 
  constructor(
    private actions$: Actions,
    private youTubeService: YouTubeService
  ) {}
}