// usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');

    this.http.get<any>('https://geoapoyosapi-46nub.ondigitalocean.app/usuario/', { headers })
      .subscribe(response => {
        this.usuarios = response.usuario;
        this.totalItems = this.usuarios.length;
      });
  }

  abrirAgregarUsuario() {
    this.usuarioEditar = {
      idUsuario: null,
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      puesto: '',
      fechaContratacion: '',
      sueldo: 0,
      correo: '',
      contrasenia: ''
    };
  }

  editarUsuario(usuario: any) {
    this.usuarioEditar = { ...usuario };
  }

  guardarUsuario() {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token || '');
  
    let url = 'https://geoapoyosapi-46nub.ondigitalocean.app/usuario/registrarUsuario';
    let method = 'post';
  
    if (this.usuarioEditar.idUsuario) {
      url = `https://geoapoyosapi-46nub.ondigitalocean.app/usuario/editarUsuario`;
      method = 'put';
    }
  
    // Validations
    if (!this.usuarioEditar.nombre || this.usuarioEditar.nombre.trim() === '') {
      this.mostrarSnackBar('Error: Nombre es requerido');
      return;
    }
  
    if (!this.usuarioEditar.primerApellido || this.usuarioEditar.primerApellido.trim() === '') {
      this.mostrarSnackBar('Error: Primer Apellido es requerido');
      return;
    }
  
    if (!this.usuarioEditar.fechaContratacion) {
      this.mostrarSnackBar('Error: Fecha de Contratación es requerido');
      return;
    }
  
    if (isNaN(this.usuarioEditar.sueldo) || this.usuarioEditar.sueldo <= 0) {
      this.mostrarSnackBar('Error: Sueldo debe de ser un numero positivo');
      return;
    }
  
    if (!this.usuarioEditar.correo || this.usuarioEditar.correo.trim() === '') {
      this.mostrarSnackBar('Error: Correo es requerido');
      return;
    }
  
    if (!this.usuarioEditar.contrasenia || this.usuarioEditar.contrasenia.trim() === '') {
      this.mostrarSnackBar('Error: Contraseña es requerido');
      return;
    }
  
    const body = {
      idUsuario: this.usuarioEditar.idUsuario,
      nombre: this.usuarioEditar.nombre,
      primerApellido: this.usuarioEditar.primerApellido,
      segundoApellido: this.usuarioEditar.segundoApellido,
      puesto: this.usuarioEditar.puesto,
      fechaContratacion: this.usuarioEditar.fechaContratacion,
      sueldo: this.usuarioEditar.sueldo.toString(),
      correo: this.usuarioEditar.correo,
      contrasenia: this.usuarioEditar.contrasenia
    };
  
    this.http[method]<any>(url, body, { headers })
      .subscribe(
        response => {
          console.log('Usuario guardado exitosamente:', response);
          this.getUsuarios();
          this.usuarioEditar = null;
        },
        error => {
          console.error('Error al guardar el usuario:', error);
          this.mostrarSnackBar('Error al guardar el usuario');
        }
      );
  }
  
  mostrarSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // Duración en milisegundos
      horizontalPosition: 'center', // Posición horizontal
      verticalPosition: 'top', // Posición vertical
      panelClass: ['error-snackbar'] // Clase CSS adicional para personalizar el estilo
    });
  }

  eliminarUsuario(usuario: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');

    const body = { idUsuario: usuario.idUsuario };

    this.http.put<any>('https://geoapoyosapi-46nub.ondigitalocean.app/usuario/borrarUsuario', body, { headers })
      .subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.idUsuario !== usuario.idUsuario);
      });
  }

  desbloquearUsuario(usuario: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');

    const body = { idUsuario: usuario.idUsuario };

    this.http.put<any>('https://geoapoyosapi-46nub.ondigitalocean.app/usuario/desbloquearUsuario', body, { headers })
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
    const maxRows = 15;

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