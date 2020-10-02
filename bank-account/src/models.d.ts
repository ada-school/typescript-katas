interface IUser {
  id: string;
  name: string;
}

interface IBankAccount {
  accountNumber: string;
  holder: User;
  balance: number;
}

enum TransactionType {
  Withdrawal = "withdrawal",
  Deposit = "deposit",
}

interface Transaction {
  accountNumber: IBankAccount["accountNumber"];
  transactionType: TransactionType;
  createdAt: Date;
  amount: number;
}
