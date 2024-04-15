import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-solicitantes',
  templateUrl: './solicitantes.component.html',
  styleUrls: ['./solicitantes.component.css']
})
export class SolicitantesComponent implements OnInit {
  solicitantes: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.cargarSolicitantes();
  }

  cargarSolicitantes() {
    const tokenObservable$ = of(this.authService.getToken());
    tokenObservable$.pipe(
      mergeMap(token => {
        const headers = token ? { 'token': token } : {};
        const visitasPendientes$ = this.http.post('http://localhost:8080/visita/visitasPendientes', { id: '1' }, { headers });
        const solicitantes$ = this.http.get('http://localhost:8080/solicitante/getSolicitantes', { headers });
        return forkJoin([visitasPendientes$, solicitantes$]);
      }),
      map(([visitasPendientes, solicitantes]: [any, any]) => {
        const combinedData = solicitantes.solicitante.map((solicitante: any) => {
          return {
            nombre: solicitante.nombre,
            estatus: solicitante.estatus,
            montoAprobado: solicitante.montoAprobado,
            montoSolicitado: solicitante.montoSolicitado,
            idSolicitante: solicitante.idSolicitante,
            primerApellido: solicitante.primerApellido,
            segundoApellido: solicitante.segundoApellido,
            genero: solicitante.genero,
            edad: solicitante.edad
          };
        });
        return combinedData;
      })
    ).subscribe((combinedData: any[]) => {
      this.solicitantes = combinedData;
      this.totalItems = this.solicitantes.length;
    });
  }


  cambiarEstatus(solicitante: any, estatus: string) {
    const tokenObservable$ = of(this.authService.getToken());

    tokenObservable$.pipe(
      mergeMap(token => {
        const headers = token ? { 'token': token } : {};
        let url;

        if (estatus === 'autorizar') {
          url = 'http://localhost:8080/beca/aprobar';
        } else {
          url = 'http://localhost:8080/beca/rechazar';
        }

        console.log(solicitante);
        console.log(solicitante.idSolicitante);
        const body = { id: solicitante.idSolicitante };

        return this.http.put(url, body, { headers });
      })
    ).subscribe(
      (response: any) => {
        // Manejar la respuesta de cambio de estatus
        console.log(response);
        this.cargarSolicitantes(); // <-- Llamar a cargarSolicitantes() después de cambiar el estatus
      },
      (error) => {
        console.error('Error al cambiar el estatus:', error);
      }
    );
  }

  exportarPDF() {
    const doc = new (jsPDF as any)();
    const tableHeader = ['Nombre', 'Estatus de Apoyo', 'Genero', 'Edad', 'Monto Solicitado', 'Monto Aprobado'];
    const tableRows = this.solicitantes.map(solicitante => [
      `${solicitante.nombre} ${solicitante.primerApellido} ${solicitante.segundoApellido}`,
      solicitante.estatus,
      solicitante.genero,
      solicitante.edad,
      solicitante.montoSolicitado,
      solicitante.montoAprobado
    ]);

    doc.setFontSize(18);
    doc.text('LISTADO DE CANDIDATOS PARA APOYO', 20, 20);

    doc.setFontSize(12);
    const startY = 30;
    const rowHeight = 10;
    const maxRows = 15; // Número máximo de filas por página

    doc.autoTable({
      head: [tableHeader],
      body: tableRows,
      startY,
      rowHeight,
      margin: { top: 30 },
      didDrawPage: (data) => {
        if (data.pageCount === 1) {
          doc.setFontSize(16);
        }
      }
    });

    doc.save('tabla.pdf');
  }

}


