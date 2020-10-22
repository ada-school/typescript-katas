import {
  BankAccount,
  User,
  InsuficientFundsError,
  InvalidWithdrawAmount,
  InvalidDepositAmount,
  Receipt,
  TransferReceipt,
} from "./index";

import MockDate from "mockdate";

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
  const fakeDate = new Date("2019-04-22T10:20:30Z");

  MockDate.set(fakeDate);

  expect(bankAccount.deposit(depositAmount)).toEqual(
    new Receipt(depositAmount, fakeDate)
  );

  MockDate.reset();
});

test("deberia retornar un error cuando intento hacer un deposito negativo", () => {
  const user = new User("reddy", "12345");
  const bankAccount = new BankAccount(user);
  const negativeDepositAmount = -100;

  expect(bankAccount.deposit(negativeDepositAmount)).toEqual(
    new InvalidDepositAmount()
  );
});

test("Cuando el usuario hace una transferencia, el total del recipient debe subir y el total del depositante debe bajar", () => {
  const recipient = new User("reddy", "12345");
  const depositor = new User("henry", "6789");
  const accountRecipient = new BankAccount(recipient);
  const accountDepositor = new BankAccount(depositor);
  const transferAmount = 100;

  accountDepositor.deposit(100);

  accountDepositor.transferTo(accountRecipient, transferAmount);

  expect(accountDepositor.balance).toEqual(0);
  expect(accountRecipient.balance).toEqual(100);
});

test("When transfering and there's no balance in the depositor account an InsuficientFundsError is returned", () => {
  const depositor = new User("Henry Black", "123132132");
  const recipient = new User("Reddy Tintaya", "124312");
  const recipientAccount = new BankAccount(recipient);
  const depositorAccount = new BankAccount(depositor);
  const transfer = depositorAccount.transferTo(recipientAccount, 100);

  expect(transfer).toEqual(new InsuficientFundsError());
});

test("Cuando se realiza una transferencia se debe retornar el recibo de la transferencia", () => {
  const depositor = new User("depositor", "1234");
  const recipient = new User("recipient", "3446");
  const recipientAccount = new BankAccount(recipient);
  const depositorAccount = new BankAccount(depositor);

  depositorAccount.deposit(100);

  const fakeDate = new Date("2019-04-22T10:20:30Z");
  MockDate.set(fakeDate);

  const transferReceipt = depositorAccount.transferTo(recipientAccount, 100);

  const expectedTransferReceipt = new TransferReceipt(
    100,
    fakeDate,
    depositorAccount,
    recipientAccount
  );

  expect(transferReceipt).toEqual(expectedTransferReceipt);

  MockDate.reset();

  //YAGNI.(you ain't gonna need it!!!!)
});
