import {
  Transaction,
  GasLimit,
  GasPrice,
  Address,
  TransactionPayload,
  Balance,
  ChainID,
  Nonce,
  TransactionOptions,
  TransactionVersion
} from '@elrondnetwork/erdjs';
import {
  gasLimit as defaultGasLimit,
  gasPrice,
  version as defaultVersion
} from 'constants/index';
import { RawTransactionType } from 'types/transactions';
import { isStringBase64 } from 'utils/decoders/base64Utils';

export function newTransaction(rawTransaction: RawTransactionType) {
  const { data } = rawTransaction;
  const dataPayload = isStringBase64(data)
    ? TransactionPayload.fromEncoded(data)
    : new TransactionPayload(data);
  return new Transaction({
    value: Balance.fromString(rawTransaction.value),
    data: dataPayload,
    nonce: new Nonce(rawTransaction.nonce),
    receiver: new Address(rawTransaction.receiver),
    sender: new Address(rawTransaction.sender),
    gasLimit: new GasLimit(rawTransaction.gasLimit ?? defaultGasLimit),
    gasPrice: new GasPrice(rawTransaction.gasPrice ?? gasPrice),
    chainID: new ChainID(rawTransaction.chainID),
    version: new TransactionVersion(rawTransaction.version ?? defaultVersion),
    ...(rawTransaction.options
      ? { options: new TransactionOptions(rawTransaction.options) }
      : {})
  });
}

export default newTransaction;
