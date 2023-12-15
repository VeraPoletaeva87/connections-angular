import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { State } from '../../../redux/state.models';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  get isDarkTheme() {
    return this.utilsService.isDarkTheme;
  }

  themeChangeHandler() {
    this.utilsService.changeTheme();
  }

  constructor(private store: Store<State>, private router: Router, private utilsService: UtilsService) {}

  profileClickHandler() {
    this.router.navigate(['/profile']);
  }
}