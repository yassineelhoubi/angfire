import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  listChats:any[]=[];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChats()
    .subscribe(res => this.listChats = res);
  }

}
