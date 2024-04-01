import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from '../../interface/user.interface'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [MatCardModule, MatButtonModule],
	templateUrl: './user-card.component.html'
})
export class UserCardComponent {
	@Input({ required: true }) user: User | undefined
	@Output() deleteUserEvent = new EventEmitter<number | undefined>()

	deleteUser(id: number | undefined) {
		this.deleteUserEvent.emit(id)
	}
}
