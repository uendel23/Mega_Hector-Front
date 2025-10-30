import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { Toolbar } from "./toolbar/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Mega_Hector');
}
