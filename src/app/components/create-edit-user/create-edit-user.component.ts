import { Component, Inject, inject } from '@angular/core'
import {
	FormGroup,
	FormControl,
	ReactiveFormsModule,
	Validators,
	EmailValidator
} from '@angular/forms'

import {
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogClose
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
		MatButtonModule,
		MatDialogClose
	],
	templateUrl: 'create-edit-user.component.html'
})
export class CreateEditUserComponent {
	public readonly myForm: FormGroup

	public readonly dialogRef = inject(MatDialogRef)

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.myForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			username: new FormControl('', [Validators.required])
		})
	}

	onSubmit(): void {
		if (this.myForm.valid) {
			this.data = {
				name: this.myForm.value.name,
				email: this.myForm.value.email,
				username: this.myForm.value.username
			}
			this.dialogRef.close(this.data)
		}
	}
}
