import { ConfigService } from '@nestjs/config';
import { openai } from '@ai-sdk/openai';

import { VERCEL_OPEN_AI } from './constants';

export const vercelOpenAiProvider = {
  provide: VERCEL_OPEN_AI,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const apiKey = configService.get<string>('OPENAI_API_KEY', '');
    return openai('gpt-4o-mini');
  },
};
