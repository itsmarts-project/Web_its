import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoginComponent } from './login/login.component';
import { MenuCapturadorComponent } from './menu-capturador/menu-capturador.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PermisosUsuarioComponent } from './permisos-usuario/permisos-usuario.component';
import { FormularioSolicitudComponent } from './formulario-solicitud/formulario-solicitud.component';
import { SolicitanteTableComponent } from './solicitante-table/solicitante-table.component';
import { EditarSolicitanteComponent } from './editar-solicitante/editar-solicitante.component';

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
    FormularioSolicitudComponent,
    SolicitanteTableComponent,
    EditarSolicitanteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
