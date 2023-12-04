import { Component, EventEmitter, Output } from '@angular/core';
import { YouTubeService } from 'src/app/youTube/services/youTube.service';
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

  constructor(private youTubeService: YouTubeService, private router: Router) {}

}
