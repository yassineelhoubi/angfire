import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  // resultChats:any[]=[];
  listChats:any[]=[];
  chat: Chat = {
    name: 'testname',
    msg: ''
  };
  constructor(private chatService: ChatService) { }

 

  ngOnInit(): void {
    this.chatService.getChats()
    .subscribe(res => this.listChats = res);


  }


  createNewChat(){
    this.chatService.saveChat(this.chat)
    .then(res =>{
      this.chat ={
        name: 'testname',
        msg: ''
      }
    })
  }
  deleteChat(chat:string){
    this.chatService.deleteChat(chat)
  
  }
  // ToupdateChat(chat:Chat){
  //   console.log(chat.id)
  //   this.chatService.updateChat(chat)
  // }

}
