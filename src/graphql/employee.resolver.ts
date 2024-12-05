import { Resolver, Query, Mutation, Arg, Ctx, ID, Int, registerEnumType } from 'type-graphql';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { rolesGuard } from '../auth/roles.guard';
import { CreateEmployeeInput } from '../dto/create-employee.input';
import { authMiddleware } from '../auth/auth.middleware';

// Enum for Sorting
enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@Resolver(() => Employee)
export class EmployeeResolver {
  private employeeService = new EmployeeService();

  /**
   * Get all employees with pagination, sorting, and optional filters.
   * @param ctx Request context
   * @param page Page number (default: 1)
   * @param limit Number of records per page (default: 10)
   * @param filter Optional filter for employee name
   * @param sortField Field to sort by (default: name)
   * @param sortOrder Sort order (default: ASC)
   */
  @Query(() => [Employee])
  async employees(
    @Ctx() ctx: any,
    @Arg('page', () => Int, { defaultValue: 1 }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('filter', { nullable: true }) filter?: string,
    @Arg('sortField', { nullable: true, defaultValue: 'name' }) sortField?: string,
    @Arg('sortOrder', () => SortOrder, { defaultValue: SortOrder.ASC }) sortOrder?: SortOrder,
  ) {
    authMiddleware(ctx.req, ctx.res, () => {});
    rolesGuard(ctx.req, 'admin'); 
    return this.employeeService.getPaginatedEmployees(page, limit, filter, sortField, sortOrder);
  }

  /**
   * Get a specific employee by ID.
   * @param id Employee ID
   * @param ctx Request context
   */
  @Query(() => Employee, { nullable: true })
  async employee(@Arg('id', () => ID) id: string, @Ctx() ctx: any) {
    authMiddleware(ctx.req, ctx.res, () => {});
    return this.employeeService.getEmployeeById(id);
  }

  /**
   * Add a new employee with validation (admin only).
   * @param input Employee input data
   * @param ctx Request context
   */
  @Mutation(() => Employee)
  async addEmployee(@Arg('data') input: CreateEmployeeInput, @Ctx() ctx: any) {
    authMiddleware(ctx.req, ctx.res, () => {});
    rolesGuard(ctx.req, 'admin'); // RBAC: Only admins can add employees
    return this.employeeService.createEmployee(input);
  }
}
