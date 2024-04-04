import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from '../../interface/user.interface'
import { TitleCasePipe } from '@angular/common'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { CustomUser } from '../../interface/custom-user.interface'

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [TitleCasePipe, MatCardModule, MatButtonModule],
	templateUrl: './user-card.component.html'
})
export class UserCardComponent {
	@Input({ required: true }) user: User | undefined
	@Output() deleteUserEvent = new EventEmitter<number | undefined>()
	@Output() editUserEvent = new EventEmitter<CustomUser>()

	deleteUser() {
		this.deleteUserEvent.emit()
	}

	editUser() {
		this.editUserEvent.emit()
	}
}
