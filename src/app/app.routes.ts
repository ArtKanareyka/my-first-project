import { Routes } from '@angular/router'
import { UserListComponent } from './pages/users-list/users-list.component'
import { HomeComponent } from './pages/home/home.component'

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		title: 'home'
	},
	{
		path: 'users',
		component: UserListComponent,
		title: 'users'
	},
	{
		path: '**',
		component: HomeComponent,
		redirectTo: ''
	}
]
