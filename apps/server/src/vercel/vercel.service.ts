import { Inject, Injectable } from '@nestjs/common';
import type { LanguageModelV1 } from '@ai-sdk/provider';
import { CoreMessage, streamText } from 'ai';
import type { Response } from 'express';

import { VERCEL_OPEN_AI } from './constants';
import { IMessageDto } from './interfaces';

@Injectable()
export class VercelChatService {
  constructor(
    @Inject(VERCEL_OPEN_AI)
    protected readonly model: LanguageModelV1,
  ) {}

  public chat(messages: Array<IMessageDto>, res: Response): void {
    const stream = streamText({
      model: this.model,
      messages: messages as Array<CoreMessage>,
      onError: console.error,
    });
    stream.pipeDataStreamToResponse(res);
  }
}
