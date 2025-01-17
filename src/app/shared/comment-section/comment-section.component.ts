import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss',
})
export class CommentSectionComponent implements OnInit, OnChanges {
  @Input() public bookId: string | undefined;
  @Input() public uid: string | null = '';
  public myComments: any;
  public commentForm = this.fb.group({
    comment: this.fb.control('', Validators.required),
  });
  constructor(
    private commentService: CommentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getLoggedInUserComments();
  }

  public addComment() {
    const commentValue = this.commentForm.get('comment')?.value;
    if (this.bookId && commentValue && this.uid) {
      this.commentService
        .addCommentForBook(commentValue, this.bookId, this.uid)
        .then((d: any) => {
          console.log(d);
        });
    }
  }

  public getLoggedInUserComments() {
    if (this.bookId && this.uid) {
      console.log('whhewh');
      this.commentService
        .getMyComments(this.uid, this.bookId)
        .subscribe((d) => {
          console.log(d);
        });
    }
  }
}
