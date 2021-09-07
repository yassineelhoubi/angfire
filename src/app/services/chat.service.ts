import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Chat } from '../models/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private  afs: AngularFirestore)  { }

  getChats(){
    return this.afs.collection('chats').valueChanges();
  }



  saveChat(chat: Chat){
    return this.afs.collection('chats').add(chat);
  }

  deleteChat(chat: any){
    console.log(chat)
    return this.afs.collection('chats').doc(chat.id).delete()
  }

  
}
