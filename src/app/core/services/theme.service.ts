import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkThemeSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('theme') === 'dark'
  );
  isDarkTheme$ = this.darkThemeSubject.asObservable();
  isDark: boolean = localStorage.getItem('theme') === 'dark';

  changeTheme() {
    const current = this.darkThemeSubject.value;
    if (current == true) {
      localStorage.setItem('theme', 'light');
      this.darkThemeSubject.next(false);
      this.isDark = false;
    } else {
      localStorage.setItem('theme', 'dark');
      this.darkThemeSubject.next(true);
      this.isDark = true;
    }
  }
}
