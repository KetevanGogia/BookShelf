import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { PromptCategoryDialogComponent } from '../../shared/prompt-category-dialog/prompt-category-dialog.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  public uid: string | undefined;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data) => {
      this.uid = data?.uid;
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(PromptCategoryDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.router.navigate(['/dashboard/booklist', data, this.uid]);
      }
    });
  }
}
