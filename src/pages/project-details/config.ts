// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Notification } from 'containers/notificationContext';
import {
  initalPAYGValues,
  initialIndexingValues,
  OpenPAYGFormKey,
  ProjectFormKey,
  ProjectPaygSchema,
  StartIndexingSchema,
} from 'types/schemas';
import { dismiss, ProjectNotification } from 'utils/notification';

import prompts from './prompts';
import {
  ClickAction,
  FormSubmit,
  PAYGAction,
  PaygStatus,
  ProjectAction,
  ProjectConfig,
  ProjectStatus,
} from './types';

const { project, announce, payg } = prompts;

export type ButtonItem = {
  title: string;
  action: () => void;
  color?: string;
};

const createButtonItem = (title: string, action: () => void, color?: string): ButtonItem => ({
  title,
  action,
  color,
});

export const createNetworkButtonItems = (onButtonClick: (type: ProjectAction) => void) => ({
  [ProjectStatus.NotIndexing]: [],
  [ProjectStatus.Started]: [
    createButtonItem('Announce Indexing', () => onButtonClick(ProjectAction.AnnounceIndexing)),
  ],
  [ProjectStatus.Indexing]: [
    createButtonItem('Announce Ready', () => onButtonClick(ProjectAction.AnnounceReady)),
  ],
  [ProjectStatus.Ready]: [
    createButtonItem('Announce NotIndexing', () =>
      onButtonClick(ProjectAction.AnnounceNotIndexing)
    ),
  ],
  [ProjectStatus.Terminated]: [
    createButtonItem('Announce NotIndexing', () =>
      onButtonClick(ProjectAction.AnnounceNotIndexing)
    ),
  ],
});

export const createServiceButtonItems = (onButtonClick: (type: ProjectAction) => void) => ({
  [ProjectStatus.NotIndexing]: [
    createButtonItem('Start Indexing', () => onButtonClick(ProjectAction.StartIndexing)),
    createButtonItem('Remove Project', () => onButtonClick(ProjectAction.RemoveProject)),
  ],
  [ProjectStatus.Started]: [
    createButtonItem('Stop Project', () => onButtonClick(ProjectAction.StopProject)),
  ],
  [ProjectStatus.Indexing]: [
    createButtonItem('Restart Indexing', () => onButtonClick(ProjectAction.RestartProject)),
    createButtonItem('Stop Indexing', () => onButtonClick(ProjectAction.StopIndexing)),
  ],
  [ProjectStatus.Ready]: [
    createButtonItem('Restart Indexing', () => onButtonClick(ProjectAction.RestartProject)),
    createButtonItem('Stop Indexing', () => onButtonClick(ProjectAction.StopIndexing)),
  ],
  [ProjectStatus.Terminated]: [
    createButtonItem('Restart Indexing', () => onButtonClick(ProjectAction.RestartProject)),
    createButtonItem('Remove Project', () => onButtonClick(ProjectAction.RemoveProject)),
  ],
});

export const createPaygButtonItems = (onButtonClick: (type: PAYGAction) => void) => ({
  [PaygStatus.Open]: [
    createButtonItem('Change price', () => onButtonClick(PAYGAction.PaygChangePrice)),
    createButtonItem('Close PAYG', () => onButtonClick(PAYGAction.PaygClose)),
  ],
  [PaygStatus.Close]: [createButtonItem('Open PAYG', () => onButtonClick(PAYGAction.PaygOpen))],
});

export const PAYGActionName = {
  [PAYGAction.PaygOpen]: 'Open PAYG',
  [PAYGAction.PaygChangePrice]: 'Change Price',
  [PAYGAction.PaygClose]: 'Close PAYG',
};

export const ProjectActionName = {
  [ProjectAction.StartIndexing]: 'Start Indexing Project',
  [ProjectAction.RestartProject]: 'Restart Indexing Project',
  [ProjectAction.AnnounceIndexing]: 'Announce Indexing Project',
  [ProjectAction.AnnounceReady]: 'Publish Indexing to Ready',
  [ProjectAction.StopProject]: 'Stop Project',
  [ProjectAction.RemoveProject]: 'Remove Project',
  [ProjectAction.AnnounceNotIndexing]: 'Announce Not Indexing Project',
  [ProjectAction.StopIndexing]: 'Stop Indexing',
};

export type ImageVersions = {
  node: string[];
  query: string[];
};

const startProjectForms = (
  config: ProjectConfig,
  versions: ImageVersions,
  onFormSubmit: FormSubmit
) => ({
  formValues: initialIndexingValues(config),
  schema: StartIndexingSchema,
  onFormSubmit,
  items: [
    {
      formKey: ProjectFormKey.networkEndpoint,
      title: 'Indexing Network Endpiont',
      placeholder: 'wss://polkadot.api.onfinality.io/public-ws',
    },
    {
      formKey: ProjectFormKey.networkDictionary,
      title: 'Network Dictionary Endpiont',
      placeholder: 'https://api.subquery.network/sq/subquery/dictionary-polkadot',
    },
    {
      formKey: ProjectFormKey.nodeVersion,
      title: 'Node Image Version',
      options: versions.node,
    },
    {
      formKey: ProjectFormKey.queryVersion,
      title: 'Query Image Version',
      options: versions.query,
    },
    {
      formKey: ProjectFormKey.poiEnabled,
      title: 'Enable POI',
      options: ['true', 'false'],
    },
    {
      formKey: ProjectFormKey.forceEnabled,
      title: 'Enable Force Start',
      options: ['true', 'false'],
    },
  ],
});

export const createStartIndexingSteps = (
  config: ProjectConfig,
  versions: ImageVersions,
  onStartProject: FormSubmit
) => ({
  [ProjectAction.StartIndexing]: [
    {
      index: 0,
      title: project.start.title,
      desc: project.start.desc,
      buttonTitle: 'Confirm',
      form: startProjectForms(config, versions, onStartProject),
      onClick: onStartProject,
    },
  ],
});

export const createRestartProjectSteps = (
  config: ProjectConfig,
  versions: ImageVersions,
  onStartProject: FormSubmit
) => ({
  [ProjectAction.RestartProject]: [
    {
      index: 0,
      title: project.restart.title,
      desc: project.restart.desc,
      buttonTitle: 'Confirm',
      form: startProjectForms(config, versions, onStartProject),
    },
  ],
});

export const createRemoveProjectSteps = (onRemoveProject: ClickAction) => ({
  [ProjectAction.RemoveProject]: [
    {
      index: 0,
      title: project.remove.title,
      desc: project.remove.desc,
      buttonTitle: 'Confirm',
      onClick: onRemoveProject,
    },
  ],
});

export const createAnnounceIndexingSteps = (onSendTransaction: ClickAction) => ({
  [ProjectAction.AnnounceIndexing]: [
    {
      index: 0,
      title: announce.indexing.title,
      desc: announce.indexing.desc,
      buttonTitle: 'Send Transction',
      onClick: onSendTransaction,
    },
  ],
});

export const createReadyIndexingSteps = (onSendTransaction: ClickAction) => ({
  [ProjectAction.AnnounceReady]: [
    {
      index: 0,
      title: announce.ready.title,
      desc: announce.ready.desc,
      buttonTitle: 'Send Transction',
      onClick: onSendTransaction,
    },
  ],
});

export const createNotIndexingSteps = (onSendTransaction: ClickAction) => ({
  [ProjectAction.AnnounceNotIndexing]: [
    {
      index: 0,
      title: announce.notIndexing.title,
      desc: announce.notIndexing.desc,
      buttonTitle: 'Send Transction',
      onClick: onSendTransaction,
    },
  ],
});

export const createStopProjectSteps = (onStopProject: ClickAction) => ({
  [ProjectAction.StopProject]: [
    {
      index: 0,
      title: project.stop.title,
      desc: project.stop.desc,
      buttonTitle: 'Confirm',
      onClick: onStopProject,
    },
  ],
});

export const createStopIndexingSteps = (onStopProject: ClickAction) => ({
  [ProjectAction.StopIndexing]: [
    {
      index: 0,
      title: project.stop.title,
      desc: project.stop.desc,
      buttonTitle: 'Confirm',
      onClick: onStopProject,
    },
  ],
});

const setPaygPriceForms = (config: ProjectConfig, onFormSubmit: FormSubmit) => ({
  formValues: initalPAYGValues(config),
  schema: ProjectPaygSchema,
  onFormSubmit,
  items: [
    {
      formKey: OpenPAYGFormKey.paygPrice,
      title: 'Advertise a price per 1,000 requests (SQT)',
      placeholder: '300',
    },
    {
      formKey: OpenPAYGFormKey.paygPeriod,
      title: 'Validity Period',
      placeholder: 'Set a validity period',
    },
  ],
});

export const createPaygOpenSteps = (config: ProjectConfig, onPaygOpen: FormSubmit) => [
  {
    index: 0,
    title: payg.open.title,
    desc: payg.open.desc,
    buttonTitle: 'Confirm',
    form: setPaygPriceForms(config, onPaygOpen),
  },
];

export const createPaygChangePriceSteps = (
  config: ProjectConfig,
  onPaygChangePrice: FormSubmit
) => ({
  [PAYGAction.PaygChangePrice]: [
    {
      index: 0,
      title: prompts.paygChangePrice.title,
      desc: prompts.paygChangePrice.desc,
      buttonTitle: 'Confirm',
      form: setPaygPriceForms(config, onPaygChangePrice),
    },
  ],
});

export const createPaygCloseSteps = (onPaygClose: ClickAction) => ({
  [PAYGAction.PaygClose]: [
    {
      index: 0,
      title: prompts.paygClose.title,
      desc: prompts.paygClose.desc,
      buttonTitle: 'Confirm',
      onClick: onPaygClose,
    },
  ],
});

// inconsistent status config
export const aletMessages = {
  [ProjectStatus.Started]: {
    title: 'Ready to indexing the project on Suquery Network',
    description:
      'The current project has been alreay started, check the progress and logs make sure indexing is alright. Try press the Announce Indexing button to annouce indexing this project on Subquery Network. You can also try to restart indexing if something wrong happens.',
  },
  [ProjectStatus.Terminated]: {
    title: 'Status Inconsistent',
    description:
      'The current indexing service for this project is terminated but the indexing service status on Subquery Network is still INDEXING, we encourage you to press the Announce NotIndexing button to change the online status to NOTINDEXING as well',
  },
};

// notification config
export const notifications: Record<string, Notification> = {
  [ProjectNotification.Started]: {
    type: 'success',
    title: 'Project is starting',
    message: `Starting project may take around 5 seconds`,
    dismiss: dismiss(),
  },
  [ProjectNotification.Terminated]: {
    type: 'success',
    title: 'Project Terminated',
    message: `The project has been stopped, you can restart or update the status on network to not indexing`,
    dismiss: dismiss(),
  },
};
