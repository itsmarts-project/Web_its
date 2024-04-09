import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoginComponent } from './login/login.component';
import { MenuCapturadorComponent } from './menu-capturador/menu-capturador.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { RegistroCandidatosComponent } from './registro-candidatos/registro-candidatos.component';
import { EstatusVisitaComponent } from './estatus-visita/estatus-visita.component';
import { PermisosUsuarioComponent } from './permisos-usuario/permisos-usuario.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu-admin', component: MenuAdminComponent },
  { path: 'menu-capturador', component: MenuCapturadorComponent },
  { path: 'registro-candidatos', component: RegistroCandidatosComponent },
  { path: 'estatus-visita', component: EstatusVisitaComponent },
  { path: 'permisos-usuario', component: PermisosUsuarioComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
