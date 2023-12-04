import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import SharedModule from 'src/app/shared/modules/shared.module';

@Component({
  standalone: true,
  selector: 'app-login-block',
  templateUrl: './loginBlock.component.html',
  styleUrls: ['./loginBlock.component.css'],
  imports: [CommonModule, SharedModule]
})
export class LoginBlockComponent {
  public subscription : Subscription;
  loggedIn: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.subscription = this.loginService.getValue().subscribe((value) => {
      this.loggedIn = value;
    })
  }

  clickHandler() {
    this.router.navigate(['/login']);
  }

  logoutClickHandler() {
    this.loginService.logOut();
  }

  loginClickHandler() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
