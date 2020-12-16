import { CommandContribution } from '@theia/core';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ContainerModule } from 'inversify';
import { ExplorerContribution } from './explorer-contribution';
import { FileFileMenuContribution } from './fix-file-menu-contribution';

export default new ContainerModule((bind) => {
  bind(ExplorerContribution)
    .toSelf()
    .inSingletonScope();
  bind(FileFileMenuContribution)
    .toSelf()
    .inSingletonScope();
  bind(FrontendApplicationContribution).to(ExplorerContribution);
  bind(CommandContribution).toService(FileFileMenuContribution);
});
