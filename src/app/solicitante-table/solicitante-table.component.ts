import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export interface Solicitante {
  idSolicitante: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  edad: string;
  correo: string;
  fechaAlta: string;
  montoAprobado: string;
  montoSolicitado: string;
  estatus: string;
  universidad: string;
  fotoSolicitante: string;
}

@Component({
  selector: 'app-solicitante-table',
  templateUrl: './solicitante-table.component.html',
  styleUrls: ['./solicitante-table.component.css']
})



export class SolicitanteTableComponent implements OnInit {
  solicitantes: Solicitante[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.obtenerSolicitante();
  }

  obtenerSolicitante() {
    this.authService.getToken().subscribe(token => {
      const headers = token ? { 'token': token } : {};

      this.http.get<{ solicitante: Solicitante[] }>('http://localhost:8080/solicitante/getSolicitantes', { headers })
        .subscribe(
          response => {
            this.solicitantes = response.solicitante;
          },
          error => {
            console.log('Error al pedir solicitantes:', error);
          }
        );
    });
  }

  exportarPDF() {
    const doc = new jsPDF();
    const tableRows = [];

    // Encabezados de la tabla
    const headers = [
      ['ID', 'Nombre', 'Apellidos', 'Correo', 'Fecha Alta', 'Estatus', 'Universidad', 'Catalogos'],
    ];

    // Datos de los solicitantes
    this.solicitantes.forEach(solicitante => {
      const row = [
        solicitante.idSolicitante,
        solicitante.nombre,
        `${solicitante.primerApellido} ${solicitante.segundoApellido}`,
        solicitante.correo,
        solicitante.fechaAlta,
        solicitante.estatus,
        solicitante.universidad
      ];
      tableRows.push(row);
    });

    (doc as any).autoTable({
      head: [headers[0]],
      body: tableRows,
      startY: 20,
    });

    doc.save('solicitantes.pdf');
  }

  editarSolicitante(solicitante: Solicitante) {
    // Lógica para editar el solicitante
    console.log('Editar solicitante:', solicitante);
  }

  aceptarSolicitante(solicitante: Solicitante) {
    // Lógica para aceptar el solicitante
    console.log('Aceptar solicitante:', solicitante);
  }

}
