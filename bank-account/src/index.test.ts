import { BankAccount, User } from "./index";

test("should run a test", () => {
  expect(true).toBeTruthy();
});

test("should deposit into account and reflect new balance", () => {
  const bankAccount = new BankAccount(new User("reddy", "1234"));
  const oldBalance = bankAccount.balance;
  bankAccount.deposit(100);
  expect(bankAccount.balance).toEqual(oldBalance + 100);
});
