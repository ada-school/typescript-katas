export class Receipt {
  amount: number;
  date: Date;

  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
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

  deposit(amount: number): Receipt | Error {
    const isAmountNegative = amount < 0;
    if (isAmountNegative) return new InvalidDepositAmount();

    this.balance += amount;

    return new Receipt(amount, new Date());
  }

  withdraw(amount: number): void | Error {
    const isAmountNegative = amount < 0;
    if (isAmountNegative) return new InvalidWithdrawAmount();

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
  ): void | Error {
    const withdrawResult = this.withdraw(transferAmount);

    if (withdrawResult instanceof Error) {
      return withdrawResult;
    }

    accountRecipient.deposit(transferAmount);
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

export class InvalidWithdrawAmount extends Error {
  constructor() {
    super("Invalid withdraw Amount");
    Object.setPrototypeOf(this, InvalidWithdrawAmount.prototype);
  }
}

export class InvalidDepositAmount extends Error {
  constructor() {
    super("Invalid deposit amount");
    Object.setPrototypeOf(this, InvalidDepositAmount.prototype);
  }
}
