import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'list/id', component: EditHeroComponent },
  { path: 'members', component: MemberListComponent },
  { path: 'members/id', component: MemberDetailComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
