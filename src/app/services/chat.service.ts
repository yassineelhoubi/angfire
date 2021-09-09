import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Chat } from '../models/chat';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore) { }

  // getChats(){    

  //   return this.afs.collection('chats')
  //   .snapshotChanges()
  //   .pipe(
  //     map(actions => {
  //       // actions is an array of DocumentChangeAction
  //       return actions.map(action => {
  //         const data = action.payload.doc.data() as Chat;
  //         return {
  //           id: action.payload.doc.id,
  //           name: data.name,
  //           msg: data.msg
  //         };
  //       });
  //     })
  //   );

  // }
  private data: Chat[] = [];
  public dataSubject: BehaviorSubject<Chat[]> = new BehaviorSubject(this.data);
  getChats() {

    this.afs.collection('chats')
      .snapshotChanges()
      .subscribe((res) => {
        this.data = []
        res.forEach((snap) => {
          const obj = snap.payload.doc.data() as Chat
          obj.id = snap.payload.doc.id
          this.data.push(obj)
          this.dataSubject.next(this.data)
        })
      })

  }


  saveChat(chat: Chat) {
    return this.afs.collection('chats').add(chat);
  }

  deleteChat(id: string) {

    return this.afs.collection('chats').doc(id).delete()
  }

  UpdateChat(doc_id: string, chat: Chat) {
    return this.afs.collection('chats').doc(doc_id).update({ msg: chat.msg });
  }


}
