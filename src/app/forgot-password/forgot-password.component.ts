import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string ='';
  respuesta: string ='';
  mensajeJalo: string = ', espere un correo de confirmacion';
  mensajeNoJalo: string = 'No se ha hecho contacto con el administrador, intentalo mas tarde';

  constructor(private http: HttpClient){}

  resetPassword() {
    const url = 'https://geoapoyosapi-46nub.ondigitalocean.app/login/correoRestablecer';
    const data = { correo: this.email };
  
    this.http.post<any>(url, data)
      .subscribe(
        response => {
          this.respuesta = response.msg+this.mensajeJalo;
          console.log(response);
        },
        error => {
          this.respuesta = this.mensajeNoJalo;
          console.log('Error', error);
        }
      );
  }
}
