import { CommonModule } from '@angular/common'
import { Component, input, output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { TransferTo } from '../../models/transfer'
import { TransferData, TransferPreview } from '../transfer-preview/transfer-preview'

@Component({
  selector: 'app-transfer-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './transfer-form.html',
  styleUrl: './transfer-form.scss',
})
export class TransferForm {
  currentBalance = input.required<number>()

  transferComplete = output<TransferTo>()

  transferForm = new FormGroup({
    toAccount: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(500)])
  })

  constructor(private dialog: MatDialog) {}

  onSubmit () {
    if (this.transferForm.valid) {
      const amount = Number(this.transferForm.value.amount)
      const toAccount = this.transferForm.value.toAccount!

      const dialogData: TransferData = {
        fromAccount: `FreeChecking(4692) - $${ this.currentBalance().toFixed(2) }`,
        toAccount,
        amount
      }

      const dialogRef = this.dialog.open(TransferPreview, {
        width: '500px',
        maxWidth: '95vw',
        data: dialogData
      })

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.transferComplete.emit({ toAccount, amount })
          this.transferForm.reset({ toAccount: '', amount: '' })
        }
      })
    }
  }
}
