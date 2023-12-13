import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable()

export class CountdownService {
    private countdownSubject = new BehaviorSubject<number>(60);

    countdown$ = this.countdownSubject.asObservable();
    isRunning = false;

    startCountdown() {

        if (!this.isRunning) {
            this.isRunning = true;
            this.countdown$.pipe(
                debounceTime(1000),
            )
            .subscribe(() => {
                const current = this.countdownSubject.value;
                if (current > 0) {
                    this.countdownSubject.next(current - 1);
                } else {
                    this.isRunning = false;
                    this.countdownSubject.next(60);
                }
            })
        }

        
    }
}