import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

import { LANGCHAIN_OPEN_AI } from './constants';

export const langchainOpenAiProvider = {
  provide: LANGCHAIN_OPEN_AI,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const apiKey = configService.get<string>('OPENAI_API_KEY', '');
    return new ChatOpenAI({
      model: 'gpt-4o-mini',
      apiKey,
    });
  },
};
