import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersApi } from './services/users-api/users-api.service';

@Component({
	selector: 'app-root',
	standalone: true,
	providers: [],
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent {
	private readonly usersApi = inject(UsersApi);
}
