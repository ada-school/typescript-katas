export class BankAccount implements IBankAccount {
  accountNumber: string;
  holder: User;
  balance: number;

  constructor(holder: User) {
    this.accountNumber = (Math.random() * 10000).toString(10);
    this.holder = holder;
    this.balance = 0;
  }

  deposit(amount: number): void {
    this.balance += amount;
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
