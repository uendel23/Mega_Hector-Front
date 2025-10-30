import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-resultado',
   standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './resultado.html',
  styleUrl: './resultado.css'
})

export class Resultado {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {resultado?: number; erro?: string}) {}
}
