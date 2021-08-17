import './util/module-alias';
import { Application, json } from 'express';
import { BuildController } from './controllers/builds';
import { Server } from '@overnightjs/core';
import { TestCaseController } from './controllers/testCases';
import { TestPlanController } from './controllers/testPlans';
import { TestProjectController } from './controllers/testProjects';
import { TestSuiteController } from './controllers/testSuites';

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
    this.addControllers([
      new TestProjectController(),
      new BuildController(),
      new TestCaseController(),
      new TestProjectController(),
      new TestPlanController(),
      new TestSuiteController(),
    ]);
  }

  public getApp(): Application {
    return this.app;
  }
}
