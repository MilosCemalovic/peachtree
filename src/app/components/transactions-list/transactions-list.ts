import { Component, input, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

// Interface based on data from mock/transactions.json
export interface Transaction {
  amount: number
  categoryCode: string
  merchant: string
  merchantLogo: string // Base64 string
  transactionDate: number // timestamp (milliseconds)
  transactionType: string
}

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './transactions-list.html',
  styleUrls: ['./transactions-list.scss']
})
export class TransactionsList {
  transactions = input.required<Transaction[]>();

  searchTerm = signal<string>('');
  sortBy = signal<'date' | 'merchant' | 'amount'>('date');
  sortOrder = signal<'asc' | 'desc'>('desc'); // newest first by default

  // --- COMPUTED: filtered + sorted transactions ---
  displayedTransactions = computed(() => {
    const term = this.searchTerm().toLowerCase()

    // Filter with safe access
    const filtered = this.transactions().filter(tx =>
      (tx.merchant?.toLowerCase() ?? '').includes(term) ||
      (tx.transactionType?.toLowerCase() ?? '').includes(term)
    )

    // Sort with persistent order and case‑insensitive merchant comparison
    const sorted = [...filtered].sort((a, b) => {
      const direction = this.sortOrder() === 'asc' ? 1 : -1

      switch (this.sortBy()) {
        case 'date':
          return direction * (a.transactionDate - b.transactionDate)
        case 'merchant':
          // Case‑insensitive, safe fallback to empty string
          const benA = (a.merchant ?? '').toLowerCase()
          const benB = (b.merchant ?? '').toLowerCase()
          return direction * benA.localeCompare(benB)
        case 'amount':
          return direction * (a.amount - b.amount)
        default:
          return 0
      }
    })

    return sorted
  });

  updateSearch (event: Event) {
    const input = event.target as HTMLInputElement
    this.searchTerm.set(input.value)
  }

  clearSearch () {
    this.searchTerm.set('')
  }

  setSort (field: 'date' | 'merchant' | 'amount'): void {
    if (this.sortBy() === field) {
      this.sortOrder.update(order => order === 'asc' ? 'desc' : 'asc')
    } else {
      this.sortBy.set(field)
    }
  }

  isActive (field: string): boolean {
    return this.sortBy() === field
  }

  getSortIcon (field: string): string {
    if (!this.isActive(field)) return '↕️'
    return this.sortOrder() === 'asc' ? '↑' : '↓'
  }
}