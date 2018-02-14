import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpRequesterService } from './http-requester.service';
import { UserStorageService } from './user-storage.service';

const DOMAIN_URL = 'http://localhost:3000/api/chat';

@Injectable()
export class ChatService {

  constructor(private httpRequester: HttpRequesterService,
              private userStorage: UserStorageService) { }

  getHeaders(): Object {
    const token = this.userStorage.getLoggedUserToken();
    const headers = {
      token,
      'Content-Type': 'application/json'
    };

    return headers;
  }

  getAllChatsInRoom(roomId: string): Observable<Response> {
    const headers = this.getHeaders();
    const GET_ALL_CHATS_IN_ROOM_URL = DOMAIN_URL + `/rooms/${roomId}`;

    return this.httpRequester.get(GET_ALL_CHATS_IN_ROOM_URL, headers);
  }

  getChatById(chatId: string): Observable<Response> {
    const headers = this.getHeaders();
    const GET_CHAT_BY_ID_URL = DOMAIN_URL + `/${chatId}`;

    return this.httpRequester.get(GET_CHAT_BY_ID_URL, headers);
  }

  createChat(chat: any): Observable<Response> {
    const headers = this.getHeaders();
    const CREATE_CHAT_URL = DOMAIN_URL + '/';

    return this.httpRequester.post(CREATE_CHAT_URL, chat, headers);
  }

  updateChat(chat: any, chatId: string): Observable<Response> {
    const headers = this.getHeaders();
    const UPDATE_CHAT_URL = DOMAIN_URL + `/${chatId}`;

    return this.httpRequester.put(UPDATE_CHAT_URL, chat, headers);
  }

  deleteChat(chatId: string): Observable<Response> {
    const headers = this.getHeaders();
    const DELETE_CHAT_URL = DOMAIN_URL + `/${chatId}`;

    return this.httpRequester.delete(DELETE_CHAT_URL, headers);
  }
}
