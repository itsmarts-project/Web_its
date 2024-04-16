import { Component } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeocodingServiceService } from '../geocoding-service.service';


@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.css']
})
export class FormularioSolicitudComponent {
  activeTab: number = 0;
  data: any = {
    solicitante: {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      genero: '',
      edad: '',
      correo: '',
      fechaAlta: '12-05-2024',
      montoSolicitado: '',
      universidad: ''
    },
    domicilio: {
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      ciudad: '',
      estado: '',
      latitud: '',
      longitud: ''
    },
    formulario: {
      pregunta1: '',
      pregunta2: '',
      pregunta3: '',
      pregunta4: '',
      pregunta5: '',
      pregunta6: '',
      pregunta7: '',
      pregunta8: '',
      pregunta9: '',
      pregunta10: '',
      pregunta11: '',
      pregunta12: '',
      pregunta13: '',
      pregunta14: '',
      pregunta15: '',
      pregunta16: '',
      pregunta17: ''
    }
  };
  fotoSolicitante: File | undefined;

  constructor(private _solicitudesService_: SolicitudesService, private snackBar: MatSnackBar, private geocodingService: GeocodingServiceService) {}

  onSubmit() {
    if (!this.formCompleted) {
      this.mostrarSnackBar('Debe completar todos los campos y seleccionar una imagen');
      return;
    }

    // Validar formato de correo electrónico
    if (!this.validarCorreo(this.data.solicitante.correo)) {
      this.mostrarSnackBar('El formato de correo electrónico no es válido');
      return;
    }

    // Validar formato de fecha de alta
    if (!this.validarFecha(this.data.solicitante.fechaAlta)) {
      this.mostrarSnackBar('El formato de fecha de alta no es válido');
      return;
    }

    // Validar formato de monto solicitado
    if (isNaN(this.data.solicitante.montoSolicitado)) {
      this.mostrarSnackBar('El monto solicitado debe ser un número válido');
      return;
    }

    // Mostrar confirmación antes de enviar la solicitud
    if (confirm('¿Está seguro que desea enviar la solicitud?')) {
      this._solicitudesService_.guardarSolicitante(this.data, this.fotoSolicitante)
        .subscribe(
          response => {
            console.log('Solicitud guardada exitosamente', response);
            this.reiniciarFormulario();
          },
          error => {
            this.mostrarSnackBar('Error al guardar la solicitud');
            console.error('Error al guardar la solicitud', error);
          }
        );
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fotoSolicitante = file;
    }
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  get formCompleted(): boolean {
    const allFieldsFilled = Object.values(this.data.solicitante).every(value => value !== '') &&
      Object.values(this.data.domicilio).every(value => value !== '') &&
      Object.values(this.data.formulario).every(value => value !== '');
    const fotoProvided = !!this.fotoSolicitante;
    return allFieldsFilled && fotoProvided;
  }

  private validarCorreo(correo: string): boolean {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  }

  private validarFecha(fecha: string): boolean {
    // Utilizar la clase Date para validar el formato de la fecha
    const fechaObj = new Date(fecha);
    return !isNaN(fechaObj.getTime());
  }

  private mostrarSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  private reiniciarFormulario(): void {
    this.data = {
      solicitante: {
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        genero: '',
        edad: '',
        correo: '',
        fechaAlta: '12-05-2024',
        montoSolicitado: '',
        universidad: ''
      },
      domicilio: {
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        colonia: '',
        ciudad: '',
        estado: '',
        latitud: '',
        longitud: ''
      },
      formulario: {
        pregunta1: '',
        pregunta2: '',
        pregunta3: '',
        pregunta4: '',
        pregunta5: '',
        pregunta6: '',
        pregunta7: '',
        pregunta8: '',
        pregunta9: '',
        pregunta10: '',
        pregunta11: '',
        pregunta12: '',
        pregunta13: '',
        pregunta14: '',
        pregunta15: '',
        pregunta16: '',
        pregunta17: ''
      }
    };
    this.fotoSolicitante = undefined;
  }

  getLatLngFromAddress() {
    const address = `${this.data.domicilio.calle}, ${this.data.domicilio.colonia}, ${this.data.domicilio.ciudad}, ${this.data.domicilio.estado}`;
    this.geocodingService.getLatLngFromAddress(address)
      .subscribe(
        (response) => {
          this.data.domicilio.latitud = response.lat;
          this.data.domicilio.longitud = response.lng;
        },
        (error) => {
          this.mostrarSnackBar('Error al obtener la latitud y longitud');
          console.error('Error al obtener la latitud y longitud:', error.message);
        }
      );
  }
  
}