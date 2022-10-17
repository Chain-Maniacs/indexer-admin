// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { FormikHelpers, FormikValues } from 'formik';

import { ControllerAction } from 'pages/controllers/types';

export enum Status {
  FINALIZED,
  OPEN,
  TERMINATING,
}

export const statusColor = {
  [Status.FINALIZED]: 'rgba(70, 219, 103, 0.4)',
  [Status.OPEN]: 'rgba(67, 136, 221, 0.24)',
  [Status.TERMINATING]: 'rgba(214, 48, 48, 0.3)',
};

export const statusText = {
  [Status.FINALIZED]: 'FINALIZED',
  [Status.OPEN]: 'OPEN',
  [Status.TERMINATING]: 'TERMINATING',
};

export type ChannelDetail = {
  id: string;
  status: Status;
  deploymentId: string;
  consumer: string;
  total: string;
  spent: string;
  onchain: string;
  price: string;
  expiredAt: number;
  terminatedAt: number;
};

export enum ChannelAction {
  Checkpoint = 'Checkpoint',
  Respond = 'Respond',
  Finalize = 'Finalize',
}

export type ChainType = 'cosmos' | 'avalanche' | 'substrate';

export enum DockerRegistry {
  query = 'onfinality/subql-query',
  substrateNode = 'onfinality/subql-node',
  cosmos = 'onfinality/subql-node-cosmos',
  avalanche = 'onfinality/subql-node-avalanche',
}

export enum IndexingStatus {
  NOTINDEXING,
  INDEXING,
  READY,
}

export enum ProjectStatus {
  NotIndexing = 'NOT INDEXING',
  Started = 'STARTED',
  Indexing = 'INDEXING',
  Ready = 'READY',
  Terminated = 'TERMINATED',
}

export enum PaygStatus {
  Open = 'OPEN',
  Close = 'CLOSE',
}

export type TransactionType =
  | ProjectAction.AnnounceIndexing
  | ProjectAction.AnnounceReady
  | ProjectAction.AnnounceNotIndexing;

export enum AccountAction {
  unregister = 'unregister',
  updateMetaData = 'updateMetadata',
}

export enum ProjectsAction {
  addProject = 'addProject',
}

export enum ProjectAction {
  StartIndexing = 'StartIndexing',
  AnnounceIndexing = 'AnnounceIndexing',
  RestartProject = 'RestartProject',
  AnnounceReady = 'AnnounceReady',
  StopProject = 'StopProject',
  AnnounceNotIndexing = 'AnnounceNotIndexing',
  StopIndexing = 'StopIndexing',
  RemoveProject = 'Remove Project',
  PaygOpen = 'Open PAYG',
  PaygChangePrice = 'Change Price',
  PaygClose = 'Close PAYG',
}

// TODO: move these types to global types
export type ModalAction = AccountAction | ControllerAction | ProjectsAction | ProjectAction;
export type ClickAction = (type?: ModalAction) => void;
export type FormSubmit = (values: FormikValues, helper: FormikHelpers<FormikValues>) => void;

export type ProjectConfig = {
  networkEndpoint: string;
  networkDictionary: string;
  nodeVersion: string;
  queryVersion: string;
  poiEnabled: boolean;
  forceEnabled: boolean;
  paygPrice: string;
};

export type ProjectServiceMetadata = {
  id: string;
  status: IndexingStatus;
} & ProjectConfig;

export type TQueryMetadata = {
  lastProcessedHeight: number;
  lastProcessedTimestamp: number;
  targetHeight: number;
  chain: string;
  specName: string;
  genesisHash: string;
  indexerHealthy?: boolean;
  indexerNodeVersion: string;
  queryNodeVersion: string;
  indexerStatus: string;
  queryStatus: string;
};

// manifest types
export type Runner = {
  node?: {
    name: string;
    version: string;
  };
  query?: {
    name: string;
    version: string;
  };
};

type DataSources = {
  kind: string;
};

export type PartialIpfsDeploymentManifest = {
  dataSources: DataSources[];
  schema: {
    file: string;
  };
  network: {
    chainId?: string;
  };
  specVersion: string;
  runner?: Runner;
};
