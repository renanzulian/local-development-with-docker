import { Operation, Wallet } from "./models.ts";
import { AppError } from "./errors.ts";

const wallets: Wallet[] = [];

export function createWallet(): Wallet {
  const wallet = {
    id: crypto.randomUUID(),
    balance: 0,
  };
  wallets.push(wallet);
  return wallet;
}

export function getWallets(): Wallet[] {
    return wallets;
}

export function operate(operation: Operation, walletId: string): Wallet {
  const wallet = wallets.find((wallet) => wallet.id === walletId);
  if (!wallet) throw new AppError("Wallet not found");
  if (operation.type === "deposit") {
    wallet.balance += operation.amount ?? 0;
    return wallet;
  }
  if (operation.type === "withdraw") {
    if (wallet.balance < operation.amount) {
      throw new AppError("Insufficient funds");
    }
    wallet.balance -= operation.amount ?? 0;
    return wallet;
  }
  if (operation.type === "transfer") {
    if (wallet.balance < operation.amount) {
      throw new AppError("Insufficient funds");
    }
    const toWallet = wallets.find((wallet) => wallet.id === operation.to);
    if (!toWallet) throw new AppError("Destination wallet not found");
    wallet.balance -= operation.amount ?? 0;
    toWallet.balance += operation.amount ?? 0;
    return wallet;
  }
  throw new AppError("Invalid operation");
}
