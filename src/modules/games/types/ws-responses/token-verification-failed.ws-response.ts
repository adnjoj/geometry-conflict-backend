import type { WsResponse } from '@nestjs/websockets';

export class TokenVerificationFailedWsResponse implements WsResponse {
  event = 'token_verification_failed';
  data = {};
}
