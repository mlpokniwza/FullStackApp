import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHeroComponent } from './edit-hero/edit-hero.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
