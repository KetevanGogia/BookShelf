import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss',
})
export class LogOutComponent {
  readonly dialogRef = inject(MatDialogRef<LogOutComponent>);
  readonly animal = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  public confirmLogOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      this.dialogRef.close();
    });
  }
}
