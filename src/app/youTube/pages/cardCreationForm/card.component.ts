import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  NonNullableFormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { dateValidator } from '../../services/validators';
import { Store } from '@ngrx/store';
import { WholeDataCustom } from 'src/app/shared/types';
import * as CustomVideoActions from '../../../redux/actions/videoList.actions';

export interface AppState {
  videoList: WholeDataCustom[];
}

@Component({
  selector: 'create-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CreateCardComponent {
  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private store: Store<{videoList: WholeDataCustom[]}>
  ) {}

  cardForm = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    image: ['', [Validators.required]],
    video: ['', [Validators.required]],
    date: ['', [Validators.required, dateValidator()]],
    tags: this.formBuilder.array([['', [Validators.required]]]),
  });

  get title(): AbstractControl<string> | null {
    return this.cardForm.get('title');
  }
  get description(): AbstractControl<string> | null {
    return this.cardForm.get('description');
  }
  get image(): AbstractControl<string> | null {
    return this.cardForm.get('image');
  }
  get video(): AbstractControl<string> | null {
    return this.cardForm.get('video');
  }
  get date(): AbstractControl<string> | null {
    return this.cardForm.get('date');
  }

  cardSaveHandler() {
    if (!this.cardForm.invalid) {
      const item = {
        id: 'custom'+Math.random().toString(36).slice(2, 7),
        snippet: {
        publishedAt: new Date(this.cardForm.controls.date.value),
        channelId: '',
        channelTitle: this.cardForm.controls.video.value,
        title: this.cardForm.controls.title.value,
        description: this.cardForm.controls.description.value,
        thumbnails: {
          default: {
            url: this.cardForm.controls.image.value,
            width: 480,
            height: 360
          },
          medium: {
            url: '',
            width: 0,
            height: 0
          },
          high: {
            url: this.cardForm.controls.image.value,
            width: 640,
            height: 480
          }
        },
        liveBroadcastContent: '',
        publishTime: new Date
      },
        statistics: {
          likeCount: '',
          favoriteCount: '',
          commentCount: ''
        },
        custom: true
      };

      this.store.dispatch(CustomVideoActions.AddCustomVideo({item}));

      this.router.navigate(['/main']);
    } else {
      this.cardForm.markAllAsTouched();
    }
  }

  resetHandler() {
    this.cardForm.reset();
    while (this.cardForm.controls.tags.length !== 1) {
      this.cardForm.controls.tags.removeAt(0);
    }
  }

  addTagHandler() {
    const tags = this.cardForm.controls.tags;
    if (tags.length < 5) {
      this.cardForm.controls.tags.push(
        new FormControl('', {nonNullable: true, validators: [Validators.required]})
      );
    }
  }
}
