import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LoginService {
    //loggedIn = false - user is not logged in
    loggedIn: boolean = false;
    private valueObs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) {}

    setValue(value: boolean): void {
        this.valueObs.next(value);
      }
      
      getValue(): Observable<boolean> {
        return this.valueObs.asObservable();
      }

    saveUser(login: string, password: string) {
        localStorage.setItem('login', login);
        localStorage.setItem('password', password);
        this.setValue(true);
    }

    logOut() {
        this.setValue(false);
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return !!localStorage.getItem('login');
    } 

    updateLogged() {
        this.setValue(!!localStorage.getItem('login'));
    }

}