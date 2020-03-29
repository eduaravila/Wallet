import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import jwt from "jsonwebtoken";

import bannedModel from "../../models/banned";
import jwtTicket from "../jwtTicket";
import { ApolloError } from "apollo-server-express";

@ValidatorConstraint({ async: true })
export class tokenIsBannedConstraint implements ValidatorConstraintInterface {
  async validate(token: any, args: ValidationArguments) {
    try {
      if (!!token) {
        await jwtTicket.validateToken(token);

        let idToken = (await jwt.decode(token, {
          complete: true
        })) as any;

        let isBanned = await bannedModel.findOne({ token: idToken.header.kid });
        if (isBanned) {
          return Promise.reject(false);
        }

        return Promise.resolve(true);
      } else {
        return Promise.resolve(true);
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

export const IsTokenBanned = (validationOpts: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOpts,
      constraints: [],
      validator: tokenIsBannedConstraint
    });
  };
};
