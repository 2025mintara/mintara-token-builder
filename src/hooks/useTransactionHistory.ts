import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'deploy' | 'mint' | 'burn' | 'update' | 'revoke' | 'multisend';
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  networkId: string;
  networkName: string;
  amount?: string;
  txHash?: string;
  walletAddress: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  details?: string;
}

const STORAGE_KEY = 'mintara_transaction_history';
const MAX_TRANSACTIONS = 100;

export const useTransactionHistory = (walletAddress: string | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage
  useEffect(() => {
    if (!walletAddress) {
      setTransactions([]);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allTransactions: Transaction[] = JSON.parse(stored);
        const userTransactions = allTransactions.filter(
          tx => tx.walletAddress.toLowerCase() === walletAddress.toLowerCase()
        );
        setTransactions(userTransactions.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error('Error loading transaction history:', error);
    }
  }, [walletAddress]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp' | 'status'>) => {
    try {
      const newTransaction: Transaction = {
        ...transaction,
        id: `${transaction.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        status: 'success',
      };

      const stored = localStorage.getItem(STORAGE_KEY);
      let allTransactions: Transaction[] = stored ? JSON.parse(stored) : [];
      allTransactions.unshift(newTransaction);

      // Keep only last MAX_TRANSACTIONS
      if (allTransactions.length > MAX_TRANSACTIONS) {
        allTransactions = allTransactions.slice(0, MAX_TRANSACTIONS);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(allTransactions));

      if (transaction.walletAddress.toLowerCase() === walletAddress?.toLowerCase()) {
        setTransactions(prev => [newTransaction, ...prev].slice(0, MAX_TRANSACTIONS));
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const clearHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allTransactions: Transaction[] = JSON.parse(stored);
        const filtered = allTransactions.filter(
          tx => tx.walletAddress.toLowerCase() !== walletAddress?.toLowerCase()
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error clearing transaction history:', error);
    }
  };

  return {
    transactions,
    addTransaction,
    clearHistory,
  };
};
