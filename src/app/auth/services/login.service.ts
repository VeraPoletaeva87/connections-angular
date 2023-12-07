import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })

export class LoginService {
    //loggedIn = false - user is not logged in
    loggedIn: boolean = false;
    private valueObs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private router: Router, private toast: ToastrService,) {}

    openSuccess(message: string) {
        this.toast.success(message);
      }
    
    openError(error: string) {
        this.toast.error(error);
      }

    setValue(value: boolean): void {
        this.valueObs.next(value);
      }
      
    getValue(): Observable<boolean> {
        return this.valueObs.asObservable();
    }

    saveUser(email: string, token: string, uid: string) {
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        localStorage.setItem('uid', uid);
        this.setValue(true);
    }

    getUser() {
        this.setValue(true);
        return {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
            uid: localStorage.getItem('uid')
        };
    }

    logOut() {
        this.setValue(false);
        localStorage.clear();
        this.router.navigate(['/signin']);
    }

    isLoggedIn() {
        return !!localStorage.getItem('email');
    } 

    updateLogged() {
        this.setValue(!!localStorage.getItem('email'));
    }
}