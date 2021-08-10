import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application, json } from 'express';
import { TestProjectController } from './controllers/testProject';

export class SetupServer extends Server {
  constructor() {
    super();
  }

  public init(): void {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(json());
    this.setupControllers();
  }
  private setupControllers() {
    const testProjectController = new TestProjectController();
    this.addControllers([testProjectController]);
  }

  public getApp(): Application {
    return this.app;
  }
}
