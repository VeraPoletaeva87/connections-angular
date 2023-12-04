import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

interface EmitterValue {
  value: string;
  direction: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() searchEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {}

}
