// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useMemo, useState } from 'react';
import { JsonRpcSigner } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { providers } from 'ethers';
import { isEmpty } from 'lodash';

import { useCoordinatorIndexer } from 'containers/coordinatorIndexer';
import { useLoading } from 'containers/loadingContext';

export function useIsMetaMaskInstalled(): boolean {
  return useMemo(() => window.ethereum?.isMetaMask, [window.ethereum]);
}

export const useWeb3 = (): Web3ReactContextInterface<providers.Web3Provider> => useWeb3React();

export function useWeb3Provider(): providers.Web3Provider | undefined {
  const { library } = useWeb3();
  return library;
}

export type Signer = JsonRpcSigner | undefined;

export function useSigner(): Signer {
  const { active, account, library } = useWeb3();
  return useMemo(() => library?.getSigner(), [active, account]);
}

export function useIsMetaMask(): boolean | undefined {
  const { active, library } = useWeb3();
  return useMemo(() => library?.provider?.isMetaMask, [active, library?.provider.isMetaMask]);
}

export function useShowMetaMask(): boolean | undefined {
  const { account } = useWeb3();
  const { pageLoading } = useLoading();
  const { indexer, load } = useCoordinatorIndexer();

  const isIndexer = useMemo(
    () => !!account && account?.toLowerCase() === indexer?.toLowerCase(),
    [account, indexer]
  );

  const [showMetaMask, setShowMetaMask] = useState<boolean>();

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    // FIXME: how to identify `isFetching account`
    const enable = !pageLoading && (!account || !isIndexer) && !isEmpty(indexer);
    setShowMetaMask(enable);
  }, [account, indexer, isIndexer, pageLoading]);

  return showMetaMask;
}
