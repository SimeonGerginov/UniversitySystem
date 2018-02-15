import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

import { UserStorageService } from '../services/user-storage.service';
import { ChatService } from '../services/chat.service';
import { NotificationService } from '../services/notification.service';
import { Student } from '../models/student.model';

const PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public chats: any;
  public joined: boolean;
  public user: Student;
  public messageData = { room: '', username: '', message: '' };
  socket = io('http://localhost:3000');

  public pageSize: number;
  public currentPageNumber: number;

  constructor(private userStorage: UserStorageService,
              private chatService: ChatService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.pageSize = PAGE_SIZE;
    this.currentPageNumber = DEFAULT_PAGE_NUMBER;

    this.user = new Student();
    this.user.username = this.userStorage.getLoggedUserUsername();
    this.user.profilePictureUrl = this.userStorage.getLoggedUserProfilePicture();
  }

  getChatByRoom(room: string): void {
    this.chatService.getAllChatsInRoom(room)
        .map((r) => r.json())
        .subscribe((resChats) => {
          const { chats } = resChats;
          this.chats = chats;
          this.notificationService.showInfo('Chats delivered');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

  joinRoom(): void {
    const date = new Date();
    this.getChatByRoom(this.user.room);
    this.messageData = { room: this.user.room, username: this.user.username, message: ''};
    this.joined = true;
    this.socket.emit('save-message', {
      room: this.user.room,
      username: this.user.username,
      message: 'Join the room',
      updated_at: date
    });
  }

  sendMessage(): void {
    this.chatService.createChat(this.messageData)
        .map((r) => r.json())
        .subscribe((res) => {
          const { c } = res;
          this.chats.push(c);
          this.socket.emit('save-message', res);
          this.notificationService.showInfo('Message added');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

  logOut(): void {
  }
}
