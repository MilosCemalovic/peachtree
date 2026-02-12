import { Component, Inject, input, output } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

export interface TransferData {
  fromAccount: string
  toAccount: string
  amount: number
}

@Component({
  selector: 'app-transfer-preview',
  standalone: true,
  imports: [],
  templateUrl: './transfer-preview.html',
  styleUrls: ['./transfer-preview.scss']
})
export class TransferPreview {
  transferData: TransferData

  constructor(public dialogRef: MatDialogRef<TransferPreview>, @Inject(MAT_DIALOG_DATA) data: TransferData) { this.transferData = data }

  onConfirm (): void {
    this.dialogRef.close('confirm')
  }

  onCancel (): void {
    this.dialogRef.close()
  }
}