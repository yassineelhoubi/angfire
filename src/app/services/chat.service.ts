import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private  afs: AngularFirestore)  { }

  getChats(){
    return this.afs.collection('chats').valueChanges();
  }

  
}
