import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from '../../interface/user.interface'

@Component({
	selector: 'app-user-card',
	standalone: true,
	templateUrl: './user-card.component.html'
})
export class UserCardComponent {
	@Input({ required: true }) user: User | undefined
	@Output() deleteUserEvent = new EventEmitter<number | undefined>()

	deleteUser(id: number | undefined) {
		this.deleteUserEvent.emit(id)
	}
}
