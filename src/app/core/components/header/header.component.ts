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
  @Output() sortEmitter = new EventEmitter<EmitterValue>();
  @Output() textEmitter = new EventEmitter<string>();

  showSettings: boolean = false;

  constructor(private youTubeService: YouTubeService, private router: Router) {}

  handleSearch(searchQuery: string) {
    this.youTubeService.setSearchQuery(searchQuery);
  }

  handleEventFromSettings() {
    this.showSettings = !this.showSettings;
  }

  handleEventFromSort(value: {value: string, direction: boolean}) {
    this.youTubeService.setSortParams(value.value, value.direction);
  }

  showFavoritesHandler() {
    this.router.navigate(['/favorites']);
  }

  cardCreateHandler() {
    this.router.navigate(['/create-card']);
  }
}
