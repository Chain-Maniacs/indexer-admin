// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { FC, VFC, useCallback, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3ReactManagerFunctions } from '@web3-react/core/dist/types';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { providers } from 'ethers';
import { Props } from './unstated';
import { useWeb3 } from '../hooks/web3Hook';

const RPC_URLS: Record<number, string> = {
  1281: 'http://127.0.0.1:9933',
  1285: 'https://moonriver.api.onfinality.io/public',
  1287: 'https://moonbeam-alpha.api.onfinality.io/public',
};

export const injectedConntector = new InjectedConnector({
  supportedChainIds: [1281, 1285, 1287],
});

export const chainNames: Record<number, string> = {
  1281: 'Moonbeam Local',
  1285: 'Moonriver',
  1287: 'Moonbeam Dev',
};

const networkConnector = new NetworkConnector({
  urls: RPC_URLS,
  defaultChainId: 1287,
});

// TODO: Acala would use https://github.com/AcalaNetwork/bodhi.js
const getLibrary = (provider: any): providers.Web3Provider => {
  return new providers.Web3Provider(provider);
};

export async function connect(activate: Web3ReactManagerFunctions['activate']): Promise<void> {
  if (await injectedConntector.isAuthorized()) {
    return activate(injectedConntector);
  }

  return activate(networkConnector);
}

// move the hooks to a seperate folder

const InitProvider: VFC = () => {
  const { activate } = useWeb3();
  const activateInitialConnector = useCallback(
    async (): Promise<void> => connect(activate),
    [activate]
  );

  useEffect(() => {
    activateInitialConnector();
  }, [activateInitialConnector]);

  return null;
};

export const Web3Provider: FC = ({ children }: Props) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <InitProvider />
      {children}
    </Web3ReactProvider>
  );
};
