import { injectable } from 'inversify';
import { WorkspaceCommands } from '@theia/workspace/lib/browser/workspace-commands';
import {
  CommandContribution,
  CommandRegistry,
  MenuContribution,
  MenuModelRegistry,
} from '@theia/core';
import { CommonCommands } from '@theia/core/lib/browser';

@injectable()
export class FixMenuContribution
  implements CommandContribution, MenuContribution {
  registerCommands(commands: CommandRegistry): void {
    commands.unregisterCommand(WorkspaceCommands.OPEN);
    commands.unregisterCommand(WorkspaceCommands.OPEN_FILE);
    commands.unregisterCommand(WorkspaceCommands.OPEN_FOLDER);
    commands.unregisterCommand(WorkspaceCommands.OPEN_WORKSPACE);
    commands.unregisterCommand(WorkspaceCommands.OPEN_RECENT_WORKSPACE);
    commands.unregisterCommand(WorkspaceCommands.CLOSE);
    commands.unregisterCommand(WorkspaceCommands.SAVE_WORKSPACE_AS);
    commands.unregisterCommand('plugin.view-container.test.toggle');
  }

  registerMenus(registry: MenuModelRegistry) {
    registry.unregisterMenuAction(CommonCommands.OPEN_VIEW.id);
  }
}
