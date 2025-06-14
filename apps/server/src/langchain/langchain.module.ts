import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LangchainChatController } from './langchain.controller';
import { LangchainChatService } from './langchain.service';
import { langchainOpenAiProvider } from './openai.provider';

@Module({
  imports: [ConfigModule],
  providers: [langchainOpenAiProvider, LangchainChatService],
  controllers: [LangchainChatController],
})
export class LangchainChatModule {}
