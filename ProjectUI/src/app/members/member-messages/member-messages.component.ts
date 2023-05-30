import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'app/_models/message';
import { MessageService } from 'app/_services/message.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string;
  @Input() messages: Message[] = [];
  messageContent = '';


  constructor(private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  tran(message: string) {
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(message, 'dd-MMM-YYYY HH:mm:ss')
    return (formattedDate);
  }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.messages.push(message);
        this.messageForm?.reset();
      }
    })
  }
}
