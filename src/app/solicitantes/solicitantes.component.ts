import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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
  solicitanteEditar: any = {
    reqSolicitante: {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      genero: '',
      edad: null,
      correo: '',
      fechaAlta: '',
      montoSolicitado: null,
      universidad: ''
    },
    reqDomicilio: {
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      ciudad: '',
      estado: '',
      latitud: '',
      longitud: ''
    }
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.cargarSolicitantes();
  }

  cargarSolicitantes() {
    const tokenObservable$ = of(this.authService.getToken());
    tokenObservable$.pipe(
      mergeMap(token => {
        const headers = token ? { 'token': token } : {};
        const solicitantes$ = this.http.get('http://localhost:8080/solicitante/getSolicitantes', { headers });
        return solicitantes$;
      }),
      map((response: any) => {
        return response.solicitante.map((solicitante: any) => {
          return {
            id: solicitante.idSolicitante,
            reqSolicitante: {
              nombre: solicitante.nombre,
              primerApellido: solicitante.primerApellido,
              segundoApellido: solicitante.segundoApellido,
              estatus: solicitante.estatus,
              montoAprobado: solicitante.montoAprobado,
              montoSolicitado: solicitante.montoSolicitado,
              genero: solicitante.genero,
              edad: solicitante.edad,
              correo: solicitante.correo,
              fechaAlta: solicitante.fechaAlta,
              universidad: solicitante.universidad
            },
            reqDomicilio: {
              calle: solicitante.calle,
              numeroExterior: solicitante.numeroExterior,
              numeroInterior: solicitante.numeroInterior,
              colonia: solicitante.colonia,
              ciudad: solicitante.ciudad,
              estado: solicitante.estado,
              latitud: solicitante.latitud,
              longitud: solicitante.longitud,
            },
            isEditing: false // Initialize isEditing flag to false
          };
        });
      })
    ).subscribe((solicitantes: any[]) => {
      this.solicitantes = solicitantes;
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
        console.log(solicitante.id);
        const body = { id: solicitante.id };

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
      `${solicitante.reqSolicitante.nombre} ${solicitante.reqSolicitante.primerApellido} ${solicitante.reqSolicitante.segundoApellido}`,
      solicitante.reqSolicitante.estatus,
      solicitante.reqSolicitante.genero,
      solicitante.reqSolicitante.edad,
      solicitante.reqSolicitante.montoSolicitado,
      solicitante.reqSolicitante.montoAprobado
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

  editarSolicitante(solicitante: any) {
    if (solicitante && solicitante.reqSolicitante && solicitante.reqDomicilio) {
      // Desactivar la edición de todos los solicitantes
      this.solicitantes.forEach(s => s.isEditing = false);
      // Activar la edición solo para el solicitante seleccionado
      solicitante.isEditing = !solicitante.isEditing;
      // Si la edición está activada, establecer el solicitante a editar
      if (solicitante.isEditing) {
        this.solicitanteEditar = { ...solicitante };
      } else {
        this.solicitanteEditar = null;
      }
    } else {
      console.error('Estructura de datos inválida');
    }
  }
  

  guardarCambios() {
    if (!this.solicitanteEditar) {
      console.error('No hay solicitante seleccionado para editar');
      return;
    }

    const token = this.authService.getToken();
    const headers = token ? { 'token': token } : {};

    const body = {
      id: this.solicitanteEditar.reqSolicitante.id,
      reqSolicitante: { ...this.solicitanteEditar.reqSolicitante },
      reqDomicilio: { ...this.solicitanteEditar.reqDomicilio }
    };

    this.http.put('http://localhost:8080/solicitante/editar', body, { headers })
      .subscribe(
        response => {
          console.log('Solicitante editado exitosamente:', response);
          this.solicitanteEditar = null; // Limpiar el solicitante a editar
          this.cargarSolicitantes(); // Volver a cargar los solicitantes
        },
        error => {
          console.error('Error al editar el solicitante:', error);
        }
      );
  }
}
