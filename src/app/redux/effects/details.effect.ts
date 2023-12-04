import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { YouTubeService } from '../../youTube/services/youTube.service';
import * as YouTube from '../actions/youTube.actions';
 
@Injectable()
export class DetailsEffects {
  loadDetails$ = createEffect(() =>
  this.actions$
    .pipe(
      ofType(YouTube.GetDetails),
      mergeMap(() => 
      this.youTubeService.getDetail$()
        .pipe(
          map(() => (YouTube.GetDetailsSuccess()))
        ))
      )
  );
 
  constructor(
    private actions$: Actions,
    private youTubeService: YouTubeService
  ) {}
}