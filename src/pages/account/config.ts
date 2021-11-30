// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createStepItem, ClickAction } from '../../components/modalView';
import { ActionType } from '../../utils/transactions';
import { FormKey } from '../projects/constant';

export const modalTitles = {
  [ActionType.configCntroller]: 'Config Controller Account',
  [ActionType.unregister]: 'Unregister Indexer Account',
};

export const createControllerSteps = (
  onUploadController: ClickAction,
  onSendTxConfigController: ClickAction
) => ({
  // FIXME: move descriptions to `prompts`
  [ActionType.configCntroller]: [
    createStepItem(
      0,
      'Controller Private Key',
      'Upload your controller private key to the coordinator service, the private key will be encrypted and save in you service db',
      'Add Controller',
      onUploadController,
      true,
      FormKey.CONFIG_CONTROLLER
    ),
    createStepItem(
      1,
      'Update your controller to contract',
      'Send transaction to the network to update the controller, the transaction processing time may take around 10s, it depends on the network and gas fee.',
      'Send Transction',
      onSendTxConfigController
    ),
  ],
});

export const createUnregisterSteps = (
  onRemoveAccounts: ClickAction,
  onUnregister: ClickAction
) => ({
  [ActionType.unregister]: [
    createStepItem(
      0,
      'Remove accounts from Server',
      'To unregister from the network, need to remove all the accounts from you coordinator server',
      'Remove Accounts',
      onRemoveAccounts
    ),
    createStepItem(
      1,
      'Unregister from Network',
      `Sorry to see the indexer unregister from the Subquery Network, please note that the staking token will deposit to your current account once transction processed`,
      'Unregister',
      onUnregister
    ),
  ],
});
