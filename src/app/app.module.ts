import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoginComponent } from './login/login.component';
import { MenuCapturadorComponent } from './menu-capturador/menu-capturador.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PermisosUsuarioComponent } from './permisos-usuario/permisos-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SolicitantesComponent } from './solicitantes/solicitantes.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormularioSolicitudComponent } from './formulario-solicitud/formulario-solicitud.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DesbloquearUsuarioComponent } from './desbloquear-usuario/desbloquear-usuario.component';
import { SolicitanteEditarComponent } from './solicitante-editar/solicitante-editar.component';


@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    LoginComponent,
    MenuAdminComponent,
    MenuCapturadorComponent,
    MenuAdminComponent,
    NavbarComponent,
    PermisosUsuarioComponent,
    SolicitantesComponent,
    PaginationComponent,
    FormularioSolicitudComponent,
    ForgotPasswordComponent,
    DesbloquearUsuarioComponent,
    SolicitanteEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
