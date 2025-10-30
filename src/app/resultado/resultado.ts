import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-resultado',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Resultado do Cálculo</h2>
    <mat-dialog-content>
      <p *ngIf="data.resultado"> O resultado é: {{data.resultado}} hectolitros</p>
      <p *ngIf="data.erro" class="erro">{{data.erro}}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]>Fechar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .erro { color: red; }
  `]
})

export class Resultado {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {resultado?: number; erro?: string}) {}
}
