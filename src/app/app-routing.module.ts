import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoginComponent } from './login/login.component';
import { MenuCapturadorComponent } from './menu-capturador/menu-capturador.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { PermisosUsuarioComponent } from './permisos-usuario/permisos-usuario.component';
import { FormularioSolicitudComponent } from './formulario-solicitud/formulario-solicitud.component';
import { SolicitanteTableComponent } from './solicitante-table/solicitante-table.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu-admin', component: MenuAdminComponent },
  { path: 'menu-capturador', component: MenuCapturadorComponent },
  { path: 'permisos-usuario', component: PermisosUsuarioComponent },
  { path: 'formulario-solicitud', component: FormularioSolicitudComponent},
  { path: 'solicitante-table', component: SolicitanteTableComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
