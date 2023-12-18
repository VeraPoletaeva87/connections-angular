import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageSubject = new BehaviorSubject<string>('');
  private showSubject = new BehaviorSubject<boolean>(false);
  private modeSubject = new BehaviorSubject<string>('');

  message$: Observable<string> = this.messageSubject.asObservable();
  show$: Observable<boolean> = this.showSubject.asObservable();
  mode$: Observable<string> = this.modeSubject.asObservable();

  showMessage(mode: string, message: string) {
    this.messageSubject.next(message);
    this.modeSubject.next(mode);
    this.showSubject.next(true);
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.messageSubject.next('');
    this.modeSubject.next('');
    this.showSubject.next(false);
  }
}
