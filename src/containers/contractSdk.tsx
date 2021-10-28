// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ContractSDK, SdkOptions, SubqueryNetwork } from '@subql/contract-sdk';
import { createContainer } from './unstated';
import Logger from '../utils/logger';
import deploymentDetails from '../contract/localnet.json';
import { useIsMetaMask, useWeb3Provider } from '../hooks/web3Hook';

export const contractSDKOptions = {
  network: 'local' as SubqueryNetwork,
  deploymentDetails,
};

function useContractsImpl(logger: Logger, initialState?: SdkOptions): ContractSDK | undefined {
  const [sdk, setSdk] = React.useState<ContractSDK | undefined>(undefined);

  const provider = useWeb3Provider();
  const isMetaMask = useIsMetaMask();

  const initSdk = React.useCallback(async () => {
    if (!initialState || !initialState.network || !initialState.deploymentDetails) {
      throw new Error(
        'Invalid initial state, contracts provider requires network and deploymentDetails'
      );
    }

    try {
      logger.l(provider, isMetaMask);
      if (provider && isMetaMask) {
        const instance = await ContractSDK.create(provider, initialState);
        logger.l('sdk', instance);
        setSdk(instance);
      }
    } catch (e) {
      logger.e('Failed to create ContractSDK instance', e);
      setSdk(undefined);
      throw e;
    }
  }, [logger, initialState, provider]);

  React.useEffect(() => {
    initSdk();
  }, [initSdk]);

  return sdk;
}

export const { useContainer: useContractSDK, Provider: ContractSDKProvider } = createContainer(
  useContractsImpl,
  {
    displayName: 'Contract SDK',
  }
);
