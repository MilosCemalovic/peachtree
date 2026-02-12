import { Component, signal } from '@angular/core'
import { Navbar } from './navbar/navbar'
import { TransferForm } from './components/transfer-form/transfer-form'
import { TransactionsList, Transaction } from './components/transactions-list/transactions-list'
import { TransferTo } from './models/transfer'
import mockData from './mock/transactions.json'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, TransferForm, TransactionsList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentBalance = signal(5824.76);

  mockTransactions: Transaction[] = (mockData.data || []).map((item: any) => ({
    amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount ?? 0,
    categoryCode: item.categoryCode ?? '',
    merchant: item.merchant ?? '',
    merchantLogo: item.merchantLogo ?? '',
    transactionDate: typeof item.transactionDate === 'string'
      ? new Date(item.transactionDate).getTime()
      : item.transactionDate ?? Date.now(),
    transactionType: item.transactionType ?? 'debit'
  }));

  onTransferComplete (transfer: TransferTo) {
    this.currentBalance.update(prev => prev - transfer.amount)

    const newTx: Transaction = {
      amount: transfer.amount,
      categoryCode: '#12a580',
      merchant: transfer.toAccount,
      merchantLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      transactionDate: Date.now(),
      transactionType: 'debit'
    }

    this.mockTransactions = [newTx, ...this.mockTransactions]
  }
}