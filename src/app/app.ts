import { Component, signal } from '@angular/core';
import { Home } from "./home/home";
import { Toolbar } from "./toolbar/toolbar";
import { Rodape } from "./rodape/rodape";

@Component({
  selector: 'app-root',
  imports: [Home, Toolbar, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Mega_Hector');
}
