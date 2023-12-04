import { NgModule } from '@angular/core';

import { HeaderComponent } from '../components/header/header.component';
import { SearchComponent } from '../components/searchInput/search.component';
import { SortComponent } from '../components/sort/sort.component';
import { LogoComponent } from '../components/logo/logo.component';
import { SettingsComponent } from '../components/settingsButton/settingsButton.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import SharedModule from '../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { LoginBlockComponent } from '../../auth/components/loginBlock/loginBlock.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    SettingsComponent,
    LogoComponent,
    SortComponent,
    SearchComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, SharedModule, LoginBlockComponent],
  exports: [HeaderComponent],
})
export default class CoreModule {}
