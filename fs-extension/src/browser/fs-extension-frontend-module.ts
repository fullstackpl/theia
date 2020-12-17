import { CommandContribution, MenuContribution } from '@theia/core';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ContainerModule } from 'inversify';
import { ExplorerContribution } from './explorer-contribution';
import { FixMenuContribution } from './fix-menu-contribution';
import { hideViews } from './hide-views';
import { PingContribution } from './ping-contribution';

export default new ContainerModule((bind, unbind, isBind, rebind) => {
  bind(ExplorerContribution)
    .toSelf()
    .inSingletonScope();
  bind(FixMenuContribution)
    .toSelf()
    .inSingletonScope();
  bind(PingContribution)
    .toSelf()
    .inSingletonScope();
  bind(FrontendApplicationContribution).to(ExplorerContribution);
  bind(FrontendApplicationContribution).to(PingContribution);
  bind(CommandContribution).toService(FixMenuContribution);
  bind(MenuContribution).toService(FixMenuContribution);

  hideViews(rebind);
});
