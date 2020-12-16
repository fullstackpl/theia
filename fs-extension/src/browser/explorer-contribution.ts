import { inject, injectable } from 'inversify';
import {
  FrontendApplicationContribution,
  FrontendApplication,
  ApplicationShell,
  CompositeTreeNode,
  ExpandableTreeNode,
} from '@theia/core/lib/browser';
import { FILE_NAVIGATOR_ID } from '@theia/navigator/lib/browser';
import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';

@injectable()
export class ExplorerContribution implements FrontendApplicationContribution {
  @inject(ApplicationShell)
  protected readonly shell: ApplicationShell;

  @inject(FileNavigatorContribution)
  protected readonly fileNavigator: FileNavigatorContribution;

  async onDidInitializeLayout(app: FrontendApplication): Promise<void> {
    const navigator = await this.fileNavigator.widget;
    if (!this.shell.mainPanel.isEmpty) {
      return;
    }
    this.shell.revealWidget(FILE_NAVIGATOR_ID);
    const srcNode = await new Promise<ExpandableTreeNode | null>((resolve) => {
      let count = 0;
      const check = () => {
        count++;
        if (count > 100) {
          console.error('Cannot open open ');
          resolve(null);
          return;
        }
        let root = navigator.model.root as CompositeTreeNode;

        const srcNode = (root
          ?.children?.[0] as CompositeTreeNode)?.children?.find((node) =>
          node.id.endsWith('/src')
        ) as ExpandableTreeNode;
        if (srcNode) {
          return resolve(srcNode);
        }
        setTimeout(check, 100);
      };
      check();
    });
    if (srcNode) {
      await navigator.model.expandNode(srcNode);
      const srcMainNode = srcNode.children.find(
        (x) => x.id.endsWith('/main.ts') || x.id.endsWith('/main.tsx')
      );
      if (srcMainNode) {
        navigator.model.openNode(srcMainNode);
      }
    }
  }
}
