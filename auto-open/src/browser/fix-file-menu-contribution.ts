import { injectable } from 'inversify';
import { WorkspaceCommands } from '@theia/workspace/lib/browser/workspace-commands';
import { CommandContribution, CommandRegistry } from '@theia/core';

@injectable()
export class FileFileMenuContribution implements CommandContribution {
  registerCommands(commands: CommandRegistry): void {
    commands.unregisterCommand(WorkspaceCommands.OPEN);
    commands.unregisterCommand(WorkspaceCommands.OPEN_FILE);
    commands.unregisterCommand(WorkspaceCommands.OPEN_FOLDER);
    commands.unregisterCommand(WorkspaceCommands.OPEN_WORKSPACE);
    commands.unregisterCommand(WorkspaceCommands.OPEN_RECENT_WORKSPACE);
    commands.unregisterCommand(WorkspaceCommands.CLOSE);
    commands.unregisterCommand(WorkspaceCommands.SAVE_WORKSPACE_AS);
  }
}
