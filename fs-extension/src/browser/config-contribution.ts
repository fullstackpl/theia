import { injectable } from 'inversify';
import * as Path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { Application } from 'express';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';

@injectable()
export class ConfigContribution implements BackendApplicationContribution {
  configure(app: Application): void {
    let isSet = false;
    app.use((req, res, next) => {
      if (isSet) {
        next();
        return;
      }
      const { apiUrl, token } = req.query;
      if (!apiUrl || !token) {
        res.status(400);
        res.send(
          '<div style="color: white; text-align: center; margin-top: 50px">Invalid configuration</div>'
        );
        return;
      }
      const tokenFile = Path.join(os.homedir(), '.fs-auth');
      fs.writeFileSync(
        tokenFile,
        JSON.stringify(
          {
            apiUrl,
            token,
          },
          null,
          2
        )
      );
      isSet = true;
      next();
    });
    const stack: Array<any> = app._router.stack;
    const layer = stack.pop();

    for (let i = 0; i < stack.length; i++) {
      if (stack[i].name === 'serveStatic') {
        stack.splice(i, 0, layer);
        break;
      }
    }
  }
}
