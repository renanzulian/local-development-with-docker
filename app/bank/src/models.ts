export interface Wallet {
  id: string;
  balance: number;
}

export interface Operation {
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  to?: string;
}
