import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entities/person/person';
import { Repository } from 'typeorm';
import { GetPersonByIdQuery } from '../../impl/get-persons.query/get-persons-by-id.query';

@QueryHandler(GetPersonByIdQuery)
export class GetPersonsByIdHandler
  implements IQueryHandler<GetPersonByIdQuery>
{
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>,
  ) {}

  async execute(query: GetPersonByIdQuery): Promise<Person> {
    return await this.personRepo.findOneBy({ id: query.id });
  }
}
