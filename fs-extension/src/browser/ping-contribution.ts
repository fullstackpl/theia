import { injectable } from 'inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

const DEFAULT_EVENTS = [
  'mousemove',
  'keydown',
  'wheel',
  'DOMMouseScroll',
  'mouseWheel',
  'mousedown',
  'touchstart',
  'touchmove',
  'MSPointerDown',
  'MSPointerMove',
];

const PING_INTERVAL = 30 * 1000;

@injectable()
export class PingContribution implements FrontendApplicationContribution {
  private onActivity: (() => void) | null = null;

  onStart() {
    if (!window.top) {
      return;
    }
    let lastPing = 0;
    this.onActivity = () => {
      if (lastPing + PING_INTERVAL > Date.now()) {
        return;
      }
      lastPing = Date.now();
      window.top.postMessage('VM_PING', '*');
    };

    DEFAULT_EVENTS.forEach((name) => {
      document.addEventListener(name, this.onActivity!);
    });
  }
  onStop() {
    if (this.onActivity) {
      DEFAULT_EVENTS.forEach((name) => {
        document.removeEventListener(name, this.onActivity!);
      });
    }
  }
}
