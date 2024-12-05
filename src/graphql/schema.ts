import { buildSchema } from 'type-graphql';
import { EmployeeResolver } from './employee.resolver';
import { UserResolver } from './user.resolver';

export const schema = async () =>
  buildSchema({
    resolvers: [EmployeeResolver, UserResolver],
    validate: false,
  });
