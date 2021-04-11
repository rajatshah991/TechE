import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailListComponent } from './pages/email-list/email-list.component';

const routes: Routes = [{
  path:'', redirectTo:'email',pathMatch:'full'
},{
  path:'email', component: EmailListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
