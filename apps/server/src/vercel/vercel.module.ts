import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { VercelChatController } from './vercel.controller';
import { VercelChatService } from './vercel.service';
import { vercelOpenAiProvider } from './openai.provider';

@Module({
  imports: [ConfigModule],
  providers: [vercelOpenAiProvider, VercelChatService],
  controllers: [VercelChatController],
})
export class VercelChatModule {}
