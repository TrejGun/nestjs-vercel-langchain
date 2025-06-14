import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

import { ChatDto } from './dto';
import { VercelChatService } from './vercel.service';

@Controller('/vercel')
export class VercelChatController {
  constructor(private readonly vercelChatService: VercelChatService) {}

  @Post('/')
  public chat(@Body() { messages }: ChatDto, @Res() res: Response): void {
    this.vercelChatService.chat(messages, res);
  }
}
