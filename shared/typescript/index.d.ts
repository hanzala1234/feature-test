import { Request, Router, Response } from "express";
import { Sequelize } from "sequelize/types";
import { Namespace } from "socket.io";
import { Schema } from 'joi';

export interface FeatureResources {
  coreApiToken: CoreApiToken,
  database: Sequelize,
  eventsNamespace: Namespace,
  router: Router,
}

export interface CoreApiToken {
  value: string,
}

export interface FeatureInitFunction {
  (featureResources: FeatureResources): void
}

export interface FeatureRequest extends Request {
  locals: {
    feature: {},
    space: {},
    service: {},
    secrets: Record<string, string>,
  }
}

export interface FeatureEndpointHandler {
  (req: FeatureRequest, res: Response, next: (error?: Error) => void): void
}

export interface ValidationSchemasBundle {
  reqQuery?: Schema,
  reqBody?: Schema,
  resBody?: Schema,
}