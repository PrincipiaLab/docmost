import { Server as HocuspocusServer } from '@hocuspocus/server';
import { IncomingMessage } from 'http';
import WebSocket from 'ws';
import { AuthenticationExtension } from './extensions/authentication.extension';
import { PersistenceExtension } from './extensions/persistence.extension';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollaborationGateway {
  constructor(
    private authenticationExtension: AuthenticationExtension,
    private persistenceExtension: PersistenceExtension,
  ) {}

  private hocuspocus = HocuspocusServer.configure({
    debounce: 5000,
    maxDebounce: 10000,
    extensions: [this.authenticationExtension, this.persistenceExtension],
  });

  handleConnection(client: WebSocket, request: IncomingMessage): any {
    this.hocuspocus.handleConnection(client, request);
  }

  handleDestroy() {
    this.hocuspocus.destroy();
  }
}