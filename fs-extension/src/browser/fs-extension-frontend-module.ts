import { CommandContribution } from '@theia/core';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ContainerModule } from 'inversify';
import { ExplorerContribution } from './explorer-contribution';
import { FileFileMenuContribution } from './fix-file-menu-contribution';
import { PingContribution } from './ping-contribution';

export default new ContainerModule((bind) => {
  bind(ExplorerContribution)
    .toSelf()
    .inSingletonScope();
  bind(FileFileMenuContribution)
    .toSelf()
    .inSingletonScope();
  bind(PingContribution)
    .toSelf()
    .inSingletonScope();
  bind(FrontendApplicationContribution).to(ExplorerContribution);
  bind(FrontendApplicationContribution).to(PingContribution);
  bind(CommandContribution).toService(FileFileMenuContribution);
});
