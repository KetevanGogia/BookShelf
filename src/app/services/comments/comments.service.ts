import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  public user: any;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user) => {
      console.log(user);
      this.user = user;
    });
  }

  public addCommentForBook(comment: string, bookId: string, uid: string) {
    return this.afs.collection(`comment`).add({
      bookId: bookId,
      userId: uid,
      comment: comment,
      timestamp: new Date(),
    });
  }

  public getMyComments(userId: string, bookId: string) {
    return this.afs
      .collection('comments', (ref) =>
        ref.where('bookId', '==', bookId).orderBy('timestamp')
      )
      .valueChanges();
  }
}
