import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Resultado } from '../resultado/resultado';
import { CalculoService } from '../calculo-service';
import { HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, RouterOutlet,  Toolbar, FormsModule, Resultado, MatDialogModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  embalagem: string = '';
  unidades: number = 0;
  hectolitros: number = 0;

  constructor(private dialog: MatDialog, private calculoService: CalculoService) {}

  calcular() {
    this.calculoService.calcularResultado(this.embalagem, this.unidades, this.hectolitros)
      .subscribe({
        next: (response) => {
          this.dialog.open(Resultado, {
            data: { resultado: response.resultado },
            width: '300px'
          });
        },
        error: (error) => {
          console.error('Erro ao calcular:', error);
          this.dialog.open(Resultado, {
            data: { erro: 'Erro ao realizar o cálculo. Tente novamente.' },
            width: '300px'
          });
        }
      });
  }

}
