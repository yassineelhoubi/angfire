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
  show_btn:boolean=false;
  chat: any = {
    name: 'testname',
    msg: ''
  };
  doc_id:any ="";
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
    this.show_btn = false;
  
  }
  ToUpdateChat(chat:Chat){
    this.show_btn = true;
    this.doc_id = chat.id;
    this.chat = chat;
  }
  clearUpdate(){
    this.show_btn = false;
    this.chat ={
      name: 'testname',
      msg: ''
    }
  }

  UpdateChat(){
    console.log(this.chat)
    this.chatService.UpdateChat(this.doc_id ,this.chat)
    .then(res =>{
      console.log(res)
      this.chat ={
        name: 'testname',
        msg: ''
      }
    })
    this.show_btn = false;

    
  }

}
