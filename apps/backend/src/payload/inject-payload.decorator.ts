import { Inject } from '@nestjs/common';
import { PAYLOAD_INSTANCE } from './payload.constants';

export const InjectPayload = () => Inject(PAYLOAD_INSTANCE);
