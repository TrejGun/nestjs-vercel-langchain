import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

import { ChatDto } from './dto';
import { LangchainChatService } from './langchain.service';

@Controller('/langchain')
export class LangchainChatController {
  constructor(private readonly langchainChatService: LangchainChatService) {}

  @Post('/')
  public async chat(
    @Body() { messages }: ChatDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.langchainChatService.chat(messages, res);
  }
}
