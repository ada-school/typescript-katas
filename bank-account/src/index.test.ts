import { BankAccount, User, InsuficientFundsError } from "./index";

test("should run a test", () => {
  expect(true).toBeTruthy();
});

test("should deposit into account and reflect new balance", () => {
  const fakeUser = new User("reddy", "1234");
  const bankAccount = new BankAccount(fakeUser);
  const expectedBalance = 100;

  bankAccount.deposit(100);

  expect(bankAccount.balance).toEqual(expectedBalance);
});

test("should withdraw from account and reflect new balance ", () => {
  const fakeUser = new User("Santiago", "1020787");
  const bankAccount = new BankAccount(fakeUser);
  const expectedBalance = 500;

  bankAccount.deposit(1000);
  bankAccount.withdraw(500);

  expect(bankAccount.balance).toEqual(expectedBalance);
});

test("should not change the balance when the withdraw amount is greater than the current balance", () => {
  const fakeUser = new User("Mauricio", "123456");
  const bankAccount = new BankAccount(fakeUser);
  const initialBalance = 500;
  const greaterThanBalanceWithdrawal = 600;

  bankAccount.deposit(initialBalance);
  expect(bankAccount.withdraw(greaterThanBalanceWithdrawal)).toEqual(
    new InsuficientFundsError()
  );

  expect(bankAccount.balance).toEqual(initialBalance);
});

test("should throw exception when the user withdraws and the current balance is 0", () => {
  const user = new User("Mauricio Hernandez", "1231321");
  const bankAccount = new BankAccount(user);
  expect(bankAccount.balance).toEqual(0);

  expect(bankAccount.withdraw(100)).toEqual(new InsuficientFundsError());
});
