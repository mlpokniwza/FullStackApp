import { Injectable } from '@angular/core';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Message } from 'app/_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('Contaier', container);

    return getPaginationResult<Message[]>(this.baseUrl + 'messages', params, this.http)
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username)
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', { recipientUsername: username, content });

  }
}
