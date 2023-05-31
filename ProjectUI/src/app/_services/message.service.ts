import { Injectable } from '@angular/core';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Message } from 'app/_models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from 'app/_models/user';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();


  constructor(private http: HttpClient) { }

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'messages?user=' + otherUsername, {
        accessTokenFactory: () => user.token

      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('ReceiveMessageThread', messages => {
      this.messageThreadSource.next(messages);
    })

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: messages => this.messageThreadSource.next([...messages, message])
      })
    })

    console.log(this.messageThread$);
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {

    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('Contaier', container);

    return getPaginationResult<Message[]>(this.baseUrl + 'messages', params, this.http)
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username)
  }

  async sendMessage(username: string, content: string) {
    return this.hubConnection?.invoke('SendMessage', { recipientUserName: username, content })
      .catch(error => console.log(error));
  }
}
