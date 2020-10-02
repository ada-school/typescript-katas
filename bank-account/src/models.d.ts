interface User {
  id: string;
  name: string;
}

interface BankAccount {
  accountNumber: string;
  holder: User;
  balance: number;
}

enum TransactionType {
  Withdrawal = "withdrawal",
  Deposit = "deposit",
}

interface Transaction {
  accountNumber: BankAccount["accountNumber"];
  transactionType: TransactionType;
  createdAt: Date;
  amount: number;
}
