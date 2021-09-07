import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Chat } from '../models/chat';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private  afs: AngularFirestore)  { }

  getChats(){
    return this.afs.collection('chats')
    .snapshotChanges()
    .pipe(
      map(actions => {
        // actions is an array of DocumentChangeAction
        return actions.map(action => {
          const data = action.payload.doc.data() as Chat;
          return {
            id: action.payload.doc.id,
            name: data.name,
            msg: data.msg
          };
        });
      })
    );
    
  }



  saveChat(chat: Chat){
    return this.afs.collection('chats').add(chat);
  }

  deleteChat(id: any){
    console.log(id)
    return this.afs.collection('chats').doc(id).delete()
  }

  
}
