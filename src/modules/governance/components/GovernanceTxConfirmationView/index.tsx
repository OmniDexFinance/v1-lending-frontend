import React from 'react';

import TxConfirmationView, {
  TxConfirmationViewProps,
} from '../../../../components/TxConfirmationView';
import { useGovernanceDataContext } from '../../../../libs/governance-provider';
import { ChainId } from '../../../../helpers/contract-helpers';

type GovernanceTxConfirmationViewProps = Omit<
  TxConfirmationViewProps,
  'txChainId' | 'allowedChainIds'
>;

function GovernanceTxConfirmationView({
  onMainTxConfirmed,
  ...props
}: GovernanceTxConfirmationViewProps) {
  const { governanceConfig } = useGovernanceDataContext();

  return (
    <TxConfirmationView
      {...props}
      txChainId={governanceConfig.chainId}
      allowedChainIds={[ChainId.mainnet, ChainId.testnet]}
    />
  );
}

export default GovernanceTxConfirmationView;
