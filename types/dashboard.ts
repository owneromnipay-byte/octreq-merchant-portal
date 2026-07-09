import type { Wallet } from "./wallet";
import type { Transaction } from "./transaction";

export interface RevenuePoint {
  date: string;
  amount: number;
}

export interface Dashboard {
  wallet: Wallet;

  transactions: {
    total: number;
    successful: number;
    pending: number;
    failed: number;
  };

  payouts: {
    total: number;
    successful: number;
    pending: number;
    processing: number;
    failed: number;
  };

  revenue: {
    today: number;
    total: number;
  };

  recent_transactions: Transaction[];

  revenue_chart?: RevenuePoint[];
}