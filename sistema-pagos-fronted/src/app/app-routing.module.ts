import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoadEstudiantesComponent } from './load-estudiantes/load-estudiantes.component';
import { LoadPagosComponent } from './load-pagos/load-pagos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { PagosComponent } from './pagos/pagos.component';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
import { EstudianteDetailsComponent } from './estudiante-details/estudiante-details.component';
=======
>>>>>>> 4b5805a9484530b2691a491f0f65cb42c228f55e
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {
<<<<<<< HEAD
    path: "admin", 
    component: AdminTemplateComponent,
    canActivate: [AuthGuard],
=======
    path: "admin", component: AdminTemplateComponent,
    canActivate: [AuthGuard], // Ensure the user is authenticated 
>>>>>>> 4b5805a9484530b2691a491f0f65cb42c228f55e
    children: [
      { path: "home", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "loadEstudiantes", component: LoadEstudiantesComponent },
      { path: "loadPagos", component: LoadPagosComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "estudiantes", component: EstudiantesComponent },
<<<<<<< HEAD
      { path: "pagos", component: PagosComponent },
      { path: "estudiante-detalles/:codigo", component: EstudianteDetailsComponent }
    ]
  },
  // Redirección para rutas no encontradas (opcional)
  { path: "**", redirectTo: "/login" }
=======
      { path: "pagos", component: PagosComponent }
    ]
  },

>>>>>>> 4b5805a9484530b2691a491f0f65cb42c228f55e
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }