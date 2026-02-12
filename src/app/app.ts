import { Component, signal } from '@angular/core'
import { Navbar } from './navbar/navbar'
import { CommonModule } from '@angular/common'
import { TransferForm } from './components/transfer-form/transfer-form'
import { TransferTo } from './models/transfer'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    TransferForm,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentBalance = signal(5824.76)

  onTransferComplete (transfer: TransferTo) {
    this.currentBalance.update(prev => prev - transfer.amount)
  }
}
