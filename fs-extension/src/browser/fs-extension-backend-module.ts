import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { ContainerModule } from 'inversify';
import { ConfigContribution } from './config-contribution';

export default new ContainerModule((bind) => {
  bind(BackendApplicationContribution).to(ConfigContribution);
});
