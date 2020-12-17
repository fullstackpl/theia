import { interfaces } from 'inversify';
import { CallHierarchyContribution } from '@theia/callhierarchy/lib/browser';
import { ScmContribution } from '@theia/scm/lib/browser/scm-contribution';
import { OutlineViewContribution } from '@theia/outline-view/lib/browser/outline-view-contribution';
import { DebugFrontendApplicationContribution } from '@theia/debug/lib/browser/debug-frontend-application-contribution';
import { DebugConsoleContribution } from '@theia/debug/lib/browser/console/debug-console-contribution';

export function hideViews(rebind: interfaces.Rebind) {
  const empty: any = {
    registerCommands: () => {},
    registerToolbarItems: () => {},
    registerMenus: () => {},
    registerKeybindings: () => {},
    registerColors: () => {},
  };

  rebind(CallHierarchyContribution).toConstantValue(empty);
  rebind(OutlineViewContribution).toConstantValue(empty);
  rebind(ScmContribution).toConstantValue(empty);
  rebind(DebugFrontendApplicationContribution).toConstantValue(empty);
  rebind(DebugConsoleContribution).toConstantValue(empty);
}
