import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoginComponent } from './login/login.component';
import { MenuCapturadorComponent } from './menu-capturador/menu-capturador.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { UsuariosComponent } from './permisos-usuario/permisos-usuario.component';
import { SolicitantesComponent } from './solicitantes/solicitantes.component';
import { FormularioSolicitudComponent } from './formulario-solicitud/formulario-solicitud.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DesbloquearUsuarioComponent } from './desbloquear-usuario/desbloquear-usuario.component';


const routes: Routes = [
  { path: '', component: SplashScreenComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu-admin', component: MenuAdminComponent },
  { path: 'menu-capturador', component: MenuCapturadorComponent },
  { path: 'permisos-usuario', component: UsuariosComponent },
  { path: 'solicitantes', component: SolicitantesComponent },
  { path: 'formulario-solicitud', component: FormularioSolicitudComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'desbloquear-usuario', component: DesbloquearUsuarioComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
