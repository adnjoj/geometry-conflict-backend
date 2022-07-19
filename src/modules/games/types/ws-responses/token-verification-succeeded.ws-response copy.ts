import type { WsResponse } from '@nestjs/websockets';

export class TokenVerificationSucceededWsResponse implements WsResponse {
  event = 'token_verification_succeeded';
  data = {};
}
