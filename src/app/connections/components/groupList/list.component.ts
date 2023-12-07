import { Component } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { GroupData } from '../../../shared/types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  items: GroupData[] = []; 
  showDialog: boolean = false;

  constructor(
    private loginService: LoginService
  ) {}

  updateHandler() {

  }

  createHandler() {
    this.showDialog = true;
  }

  handleCloseDialog() {
    this.showDialog = false;
  }

  ngOnInit() {
    const params = this.loginService.getUser();
     fetch('https://tasks.app.rs.school/angular/groups/list', 
      {
        headers: {
          'rs-uid': params.uid || '',
          'rs-email': params.email || '',
          'Authorization': 'Bearer '+params.token
      },
        method: "GET"
    }).then(response => {
      if (!response.ok) {
         response.json()
              .catch(() => {
                  throw new Error('Could not parse the JSON');
              })
              .then(({message}) => {
                this.loginService.openError(message);
              });
      } else {
        response.clone().json()
          .then((data) => {
            this.loginService.openSuccess('Successfuly got group list!');
            this.items = data.Items;
          });
      }
  });
  }
}