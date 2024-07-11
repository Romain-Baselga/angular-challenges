import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from './button.component';
import { InformationComponent } from './information.component';
import {
  admin,
  client,
  everyone,
  manager,
  reader,
  readerAndWriter,
  writer,
} from './user.model';
import { UserStore } from './user.store';

@Component({
  standalone: true,
  imports: [InformationComponent, RouterLink, ButtonComponent],
  selector: 'app-login',
  template: `
    <header class="flex items-center gap-3">
      Log as :
      <button app-button (click)="changeUserToAdmin()">Admin</button>
      <button app-button (click)="changeUserToManager()">Manager</button>
      <button app-button (click)="changeUserToReader()">Reader</button>
      <button app-button (click)="changeUserToWriter()">Writer</button>
      <button app-button (click)="changeUserToReaderWriter()">
        Reader and Writer
      </button>
      <button app-button (click)="changeUserToClient()">Client</button>
      <button app-button (click)="changeUserToEveryone()">Everyone</button>
    </header>

    <app-information></app-information>

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
})
export class LoginComponent {
  constructor(private userStore: UserStore) {}

  changeUserToAdmin() {
    this.userStore.changeToUser(admin);
  }
  changeUserToManager() {
    this.userStore.changeToUser(manager);
  }
  changeUserToReader() {
    this.userStore.changeToUser(reader);
  }
  changeUserToWriter() {
    this.userStore.changeToUser(writer);
  }
  changeUserToReaderWriter() {
    this.userStore.changeToUser(readerAndWriter);
  }
  changeUserToClient() {
    this.userStore.changeToUser(client);
  }
  changeUserToEveryone() {
    this.userStore.changeToUser(everyone);
  }
}
