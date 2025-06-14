import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { START, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { RunnableConfig } from '@langchain/core/runnables';
import { LangChainAdapter } from 'ai';
import { Readable } from 'stream';
import type { Response } from 'express';

import { LANGCHAIN_OPEN_AI } from './constants';
import { IMessageDto } from './interfaces';

const stateSchema = z.object({
  input: z.string(),
  output: z.any().optional(),
});

type StateType = z.infer<typeof stateSchema>;

@Injectable()
export class LangchainChatService {
  constructor(
    @Inject(LANGCHAIN_OPEN_AI)
    protected readonly model: ChatOpenAI,
  ) {}

  public async chat(messages: Array<IMessageDto>, res: Response) {
    const workflow = new StateGraph(stateSchema)
      .addNode('llm', this.llm.bind(this))
      .addEdge(START, 'llm');

    const app = workflow.compile();
    const { output } = await app.invoke({
      input: messages[messages.length - 1].content,
    });

    const stream = LangChainAdapter.toDataStream(output);
    Readable.fromWeb(stream).pipe(res);
  }

  public async llm(state: StateType, { callbacks }: RunnableConfig) {
    const stream = await this.model.stream(state.input, { callbacks });
    return {
      output: stream,
    };
  }
}
