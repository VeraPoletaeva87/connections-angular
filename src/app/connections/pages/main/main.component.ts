import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { State } from '../../../redux/state.models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(private store: Store<State>, private router: Router) {}

  profileClickHandler() {
    this.router.navigate(['/profile']);
  }
}