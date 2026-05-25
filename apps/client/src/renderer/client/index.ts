// Single entry point for the data layer. The UI imports `getClient()` from
// here; it does NOT import MockHoldClient or any future IpcHoldClient directly.
//
// To swap backends later, change `initClient()` to instantiate a different
// implementation based on env (e.g. `if (window.holdfast?.ipc) new IpcClient()`).

import type { IHoldClient } from './IHoldClient.ts';
import { MockHoldClient } from './MockHoldClient.ts';

let instance: IHoldClient | null = null;

export function initClient(): IHoldClient {
  if (instance) return instance;
  instance = new MockHoldClient();
  return instance;
}

export function getClient(): IHoldClient {
  if (!instance) throw new Error('Client not initialized — call initClient() in main.tsx first');
  return instance;
}

export type { IHoldClient, CurrentUser, ConnectionStatus, Unsubscribe } from './IHoldClient.ts';
