import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BookEntity } from '../../models/book.models';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public user: any;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }
  public addBook(book: BookEntity) {
    return this.afs
      .collection(`users/${this.user.uid}/Books`)
      .doc(book.id)
      .set(book);
  }

  public getAllBooks(userId: string) {
    return this.afs.collection(`users/${userId}/Books`).snapshotChanges();
  }

  public deleteBook(book: BookEntity, userId: string) {
    return this.afs.doc(`users/${userId}/Books/${book.id}`).delete();
  }

  public addBookToAlreadyRead(book: BookEntity) {
    return this.afs
      .collection(`users/${this.user.uid}/AlreadyReadBooks`)
      .doc(book.id)
      .set(book);
  }

  public getAllReadBooks(userId: string) {
    return this.afs
      .collection(`users/${userId}/AlreadyReadBooks`)
      .snapshotChanges();
  }

  public deleteReadBook(book: BookEntity, userId: string) {
    return this.afs.doc(`users/${userId}/AlreadyReadBooks/${book.id}`).delete();
  }
}
