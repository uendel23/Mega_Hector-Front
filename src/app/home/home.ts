import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Resultado } from '../resultado/resultado';
import { CalculoService } from '../calculo-service';
import { HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, RouterOutlet, FormsModule, Resultado, MatDialogModule, HttpClientModule,],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  embalagem: number = 0;
  unidades: number = 0;
  hectolitros: number = 0;

  constructor(private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private calculoService: CalculoService) {}

  calcular() {
     const embalagemNum = Number(this.embalagem);
     const unidadesNum = Number(this.unidades);
     const hectolitrosNum = Number(this.hectolitros);

  if (!embalagemNum || !unidadesNum || !hectolitrosNum) {
    this.dialog.open(Resultado, {
      data: { erro: 'Preencha todos os campos corretamente antes de calcular.' },
      width: '350px'
    });
    return;
  }
    this.calculoService.calcularResultado(this.embalagem, this.unidades, this.hectolitros)
      .subscribe({
        next: (response) => {
          const dialogRef = this.dialog.open(Resultado, {
            data: { resultado: response.resultado },
            width: '500px'
          });
          dialogRef.afterClosed().subscribe(() => {
            this.limparCampos();
            this.cdr.markForCheck();
          });
        },
        error: (error) => {
          console.error('Erro ao calcular:', error);
          const dialogRef = this.dialog.open(Resultado, {
            data: { erro: 'Erro ao realizar o cálculo. Tente novamente.' },
            width: '300px'
          });
          dialogRef.afterClosed().subscribe(() => {
            this.limparCampos();
            this.cdr.markForCheck();
          });
        }
      });
  }

  private limparCampos() {
    this.embalagem = 0;
    this.unidades = 0;
    this.hectolitros = 0;
  }

}
