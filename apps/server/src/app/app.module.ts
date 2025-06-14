import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { VercelChatModule } from '../vercel/vercel.module';
import { LangchainChatModule } from '../langchain/langchain.module';
import { HttpValidationPipe } from '../pipes';
import { AppController } from './app.controller';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: HttpValidationPipe,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    VercelChatModule,
    LangchainChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
