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
  // data: Chat[]=[] ;
  // getChats(){    
  //   this.data = [];
  //   this.afs.collection('chats')
  //   .snapshotChanges()
  //   .subscribe(res => {
  //     res.forEach(snap =>{
  //         const obj:any = snap.payload.doc.data()
  //         obj.id = snap.payload.doc.id
  //         this.data.push(obj)
  //     })
  //   })
  //   console.log(this.data)
  //   return this.data
  // }


  saveChat(chat: Chat){
    return this.afs.collection('chats').add(chat);
  }

  deleteChat(id: string){

    return this.afs.collection('chats').doc(id).delete()
  }
  // updateChat(chat:Chat){
  //   console.log(chat)
  //   return this.afs.collection('chats').
  // }

  
}
