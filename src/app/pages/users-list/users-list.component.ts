import { Component, OnInit, inject } from '@angular/core'
import { UsersService } from '../../services/users/users.service'
import { User } from '../../interface/user.interface'
import { UserCardComponent } from '../../components/user-card/user-card.component'
import { CreateEditUserComponent } from '../../components/create-edit-user/create-edit-user.component'

import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CustomUser } from '../../interface/custom-user.interface'

@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [
		UserCardComponent,

		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		FormsModule
	],
	templateUrl: './users-list.component.html'
})
export class UserListComponent implements OnInit {
	public users: User[] = []
	private isEdit: boolean = false

	private readonly dialog = inject(MatDialog)
	private readonly usersService = inject(UsersService)

	openDialog(): void {
		const dialogRef = this.dialog.open(CreateEditUserComponent, {
			disableClose: true
		})

		dialogRef
			.afterClosed()
			.subscribe(userFormData => this.addUser(userFormData))
	}

	deleteUser(id: number): void {
		this.usersService.deleteUser(id)
	}

	addUser(userFormData: CustomUser): void {
		this.isEdit = false
		this.usersService.addUser(userFormData)
	}

	editUser(user: CustomUser): void {
		this.isEdit = true
		this.usersService.editUser(user)
	}

	ngOnInit(): void {
		this.usersService.users$.subscribe(users => {
			this.users = users
		})
	}
}
