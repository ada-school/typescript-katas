import {
  BankAccount,
  User,
  InsuficientFundsError,
  InvalidWithdrawAmount,
  Receipt,
} from "./index";

const RealDate = Date;

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date("2019-04-22T10:20:30Z").getTime());
});

afterEach(() => {
  global.Date = RealDate;
});

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

test("should return an error when the user withdraws and the current balance is 0", () => {
  const user = new User("Mauricio Hernandez", "1231321");
  const bankAccount = new BankAccount(user);
  expect(bankAccount.balance).toEqual(0);

  expect(bankAccount.withdraw(100)).toEqual(new InsuficientFundsError());
});

test("should return an error when the user withdraws a negative amount", () => {
  const user = new User("Reddy tintaya", "8432290");
  const bankAccount = new BankAccount(user);
  expect(bankAccount.withdraw(-100)).toEqual(new InvalidWithdrawAmount());
});

test("Cuando hago un deposito de dinero en la cuenta debe tener monto y fecha de la operacion ", () => {
  const user = new User("mauricio", "12345");
  const bankAccount = new BankAccount(user);
  const depositAmount = 100;
  const date = new Date("2019-04-22T10:20:30Z");

  expect(bankAccount.deposit(depositAmount)).toEqual(
    new Receipt(depositAmount, date)
  );
});
