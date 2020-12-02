/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved..
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { window, workspace } from 'vscode';

// A set of VSCode extension ID's that conflict with VSCode-YAML
export const ansibleID = 'vscoss.vscode-ansible';

/**
 * Display the uninstall conflicting extension notification if there are any conflicting extensions currently installed
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showDisableAnsibleNotification(): void {
  const disableMsg = 'Disable Ansible Validation';
  const conflictMsg = 'VSCode Ansible validation is incompatible with VSCode-YAML validation. Please turn it off.';
  const ansibleConfiguration = workspace.getConfiguration('ansible');
  const validationID = 'validation';
  const validationValue = ansibleConfiguration.get(validationID);

  // If the validationValue is true in the settings.json or undefined (hasn't been set yet) then show the disable notification
  if (validationValue === undefined || validationValue === true) {
    window.showInformationMessage(conflictMsg, disableMsg).then(() => {
      ansibleConfiguration.update(validationID, false, true);
    });
  }
}
