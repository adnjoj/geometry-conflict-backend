import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PolicyHandler } from '../types/policy-handler.type';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import {
  AppAbility,
  CaslAbilityFactory,
} from '../factories/casl-ability.factory';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    const canActivate = policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );

    if (canActivate) return true;
    else throw new ForbiddenException('exceptions.Forbidden#{}');
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
