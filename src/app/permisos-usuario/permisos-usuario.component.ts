import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-usuarios',
  templateUrl: './permisos-usuario.component.html',
  styleUrls: ['./permisos-usuario.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  usuarioEditar: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');

    this.http.get<any>('http://localhost:8080/usuario/', { headers })
      .subscribe(response => {
        this.usuarios = response.usuario;
        this.totalItems = this.usuarios.length;
      });
  }

  editarUsuario(usuario: any) {
    this.usuarioEditar = { ...usuario };
  }

  guardarCambios() {
    if (!this.usuarioEditar) {
      console.error('No hay usuario seleccionado para editar');
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token || '');
  
    const body = {
      idUsuario: this.usuarioEditar.idUsuario,
      nombre: this.usuarioEditar.nombre,
      primerApellido: this.usuarioEditar.primerApellido,
      segundoApellido: this.usuarioEditar.segundoApellido,
      puesto: this.usuarioEditar.puesto,
      sueldo: this.usuarioEditar.sueldo.toString(), // Asegúrate de convertir el sueldo a string
      contrasenia: this.usuarioEditar.contrasenia,
      estatus: this.usuarioEditar.estatus,
      correo: this.usuarioEditar.correo
    };

    console.log(body);
  
    this.http.put('http://localhost:8080/usuario/editarUsuario', body, { headers })
      .subscribe(
        response => {
          console.log('Usuario editado exitosamente:', response);
          this.usuarioEditar = null;
          this.getUsuarios();
        },
        error => {
          console.error('Error al editar el usuario:', error);
        }
      );
  }

  eliminarUsuario(usuario: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    const body = { idUsuario: usuario.idUsuario };

    this.http.put<any>('http://localhost:8080/usuario/borrarUsuario', body, { headers })
      .subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.idUsuario !== usuario.idUsuario);
      });
  }

  desbloquearUsuario(usuario: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    const body = { idUsuario: usuario.idUsuario };

    this.http.put<any>('http://localhost:8080/usuario/desbloquearUsuario', body, { headers })
      .subscribe(response => {
        const index = this.usuarios.findIndex(u => u.idUsuario === response.usuario.idUsuario);
        this.usuarios[index] = response.usuario;
      });
  }

  exportarPDF() {
    const doc = new (jsPDF as any)();
    const tableHeader = ['ID', 'Nombre', 'Puesto', 'Correo', 'Estatus'];
    const tableRows = this.usuarios.map(usuario => [
      usuario.idUsuario,
      `${usuario.nombre} ${usuario.primerApellido} ${usuario.segundoApellido}`,
      usuario.puesto,
      usuario.correo,
      usuario.estatus
    ]);

    doc.setFontSize(18);
    doc.text('LISTADO DE USUARIOS', 20, 20);

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

    doc.save('tabla-usuarios.pdf');
  }
}