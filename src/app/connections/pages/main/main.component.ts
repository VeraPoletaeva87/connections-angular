import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  isDarkTheme$ = this.themeService.isDarkTheme$;

  constructor(private router: Router, private themeService: ThemeService) {}

  profileClickHandler() {
    this.router.navigate(['/profile']);
  }
}
