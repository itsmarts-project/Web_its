import { Component } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.css']
})
export class FormularioSolicitudComponent {
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

  constructor(private solicitudesService: SolicitudesService) {}

  onSubmit() {
    if (!this.fotoSolicitante) {
      console.error('Debe seleccionarse una imagen');
      return;
    }

    this.solicitudesService.guardarSolicitante(this.data, this.fotoSolicitante)
      .subscribe(
        response => {
          console.log('Solicitud guardada exitosamente', response);
        },
        error => {
          console.error('Error al guardar la solicitud', error);
        }
      );

      console.log(this.data);
      console.log(this.fotoSolicitante);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fotoSolicitante = file;
    }
  }
}
