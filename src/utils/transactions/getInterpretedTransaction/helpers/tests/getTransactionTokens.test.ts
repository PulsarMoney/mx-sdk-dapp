import {
  ServerTransactionType,
  TransactionActionCategoryEnum,
  TransactionActionsEnum
} from 'types/serverTransactions.types';
import { getTransactionTokens } from '../getTransactionTokens';
import { baseTransactionMock } from './base-transaction-mock';

describe('getTransactionTokens', () => {
  it('returns empty array when the transaction action details are missing', () => {
    const transaction: ServerTransactionType = {
      ...baseTransactionMock,
      action: undefined
    };

    const result = getTransactionTokens(transaction);

    expect(result).toEqual([]);
  });

  it('returns an array with all existing tokens in the action arguments', () => {
    const transaction: ServerTransactionType = {
      ...baseTransactionMock,
      action: {
        name: TransactionActionsEnum.swap,
        category: TransactionActionCategoryEnum.mex,
        description: 'Swap 1 WEGLD for a minimum of 45.117988 USDC',
        arguments: {
          transfers: [
            {
              type: 'FungibleESDT',
              name: 'WrappedEGLD',
              ticker: 'WEGLD',
              svgUrl:
                'https://devnet-media.elrond.com/tokens/asset/WEGLD-d7c6bb/logo.svg',
              token: 'WEGLD-d7c6bb',
              decimals: 18,
              value: '1000000000000000000'
            },
            {
              type: 'FungibleESDT',
              name: 'WrappedUSDC',
              ticker: 'USDC',
              svgUrl:
                'https://devnet-media.elrond.com/tokens/asset/USDC-8d4068/logo.svg',
              token: 'USDC-8d4068',
              decimals: 6,
              value: '45117988'
            }
          ]
        }
      }
    };

    const result = getTransactionTokens(transaction);

    expect(result).toEqual(transaction.action?.arguments?.transfers);
  });
});
