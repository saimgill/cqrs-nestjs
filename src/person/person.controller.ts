import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SavePersonCommand } from './commands/impl/save-person.command/save-person.command';
import { GetPersonsQuery } from './queries/impl/get-persons.query/get-persons.query';
import { GetPersonByIdQuery } from './queries/impl/get-persons.query/get-persons-by-id.query';

@Controller('person')
export class PersonController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('all')
  async getALl() {
    return await this.queryBus.execute(new GetPersonsQuery());
  }

  @Get(':id')
  async getById(@Param('id') id: GetPersonByIdQuery) {
    return await this.queryBus.execute(new GetPersonByIdQuery(+id));
  }

  @Post('add')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPerson(@Body() newPerson: SavePersonCommand) {
    return await this.commandBus.execute(newPerson);
  }
}
