import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  value: number;
  type: 'income' | 'outcome';
}

class ValidateBalance {
  private transactionRepository: TransactionsRepository;

  constructor(transactionRepository: TransactionsRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ value, type }: Request): void {
    if (type !== 'outcome') {
      return;
    }
    const balance = this.transactionRepository.getBalance();
    const newValue = balance.total - value;

    if (newValue < 0) {
      throw Error('Invalid balance for this transaction.');
    }
  }
}

export default ValidateBalance;
