import { Component, Inject, inject } from '@angular/core'
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'

import {
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@Component({
	selector: 'app-create-edit-user',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatInputModule,
		MatButtonModule
	],
	templateUrl: 'create-edit-user.component.html'
})
export class CreateEditUserComponent {
	myForm: FormGroup = new FormGroup({
		name: new FormControl(''),
		email: new FormControl(''),
		username: new FormControl('')
	})

	public dialogRef = inject(MatDialogRef)

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

	closeDialog(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		this.data = {
			name: this.myForm.value.name,
			email: this.myForm.value.email,
			username: this.myForm.value.username
		}
		this.dialogRef.close(this.data)
	}
}
