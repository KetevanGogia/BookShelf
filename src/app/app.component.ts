import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedHeaderComponent } from './shared/shared-header/shared-header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedHeaderComponent, HttpClientModule],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
