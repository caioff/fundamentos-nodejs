import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  id: number;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.value, 0);

    const sumOutcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, transaction) => sum + transaction.value, 0);

    const balance = {
      income: sumIncomes,
      outcome: sumOutcomes,
      total: sumIncomes - sumOutcomes,
    } as Balance;

    return balance;
  }

  public create({
    title,
    value,
    type,
  }: Omit<CreateTransactionDTO, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
