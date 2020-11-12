export class Receipt {
  amount: number;
  date: Date;

  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
  }
}

export class TransferReceipt extends Receipt {
  depositorAccount: BankAccount;
  recipientAccount: BankAccount;

  constructor(
    amount: number,
    date: Date,
    depositorAccount: BankAccount,
    recipientAccount: BankAccount
  ) {
    super(amount, date);
    this.depositorAccount = depositorAccount;
    this.recipientAccount = recipientAccount;
  }
}

export class BankAccount implements IBankAccount {
  accountNumber: string;
  holder: User;
  balance: number;

  constructor(holder: User) {
    this.accountNumber = (Math.random() * 10000).toString(10);
    this.holder = holder;
    this.balance = 0;
  }

  private isAmountNegative(amount: number): boolean {
    return amount < 0;
  }

  deposit(amount: number): Receipt | Error {
    if (this.isAmountNegative(amount))
      return new OperationAmountCannotBeNegativeError();

    this.balance += amount;

    return new Receipt(amount, new Date());
  }

  withdraw(amount: number): void | Error {
    if (this.isAmountNegative(amount))
      return new OperationAmountCannotBeNegativeError();

    const isBalanceGreaterOrEqualThanAmount = this.balance >= amount;
    if (isBalanceGreaterOrEqualThanAmount) {
      this.balance -= amount;
    } else {
      return new InsuficientFundsError();
    }
  }
  transferTo(
    accountRecipient: BankAccount,
    transferAmount: number
  ): Error | TransferReceipt {
    const withdrawResult = this.withdraw(transferAmount);

    if (withdrawResult instanceof Error) {
      return withdrawResult;
    }

    accountRecipient.deposit(transferAmount);

    return new TransferReceipt(
      transferAmount,
      new Date(),
      this,
      accountRecipient
    );
  }
}

export class User implements IUser {
  id: string;
  name: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

export class InsuficientFundsError extends Error {
  constructor() {
    super("Insuficient funds, cannot widthdraw");
    Object.setPrototypeOf(this, InsuficientFundsError.prototype);
  }
}

export class OperationAmountCannotBeNegativeError extends Error {
  constructor() {
    super("Operation Amount can not be negative");
    Object.setPrototypeOf(this, OperationAmountCannotBeNegativeError.prototype);
  }
}


export class TransactionManager {
  
  accounts = new Map<String, BankAccount>();
    constructor(bankAccounts: Array<BankAccount>) {

        bankAccounts.map((bankAccount) => {
            this.accounts.set(bankAccount.accountNumber, bankAccount)
        })

    }
}
