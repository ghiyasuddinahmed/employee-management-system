import { SortOrder } from 'mongoose';
import { EmployeeModel, EmployeeDocument } from '../models/employee.schema';

export class EmployeeService {
  /**
   * Get employees with pagination, sorting, and optional filters.
   * @param page Current page number
   * @param limit Number of records per page
   * @param filter Optional filter by employee name
   * @param sortField Field to sort by
   * @param sortOrder Sort order (asc/desc)
   */
  async getPaginatedEmployees(
    page: number,
    limit: number,
    filter?: string,
    sortField: string = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<EmployeeDocument[]> {
    const query = filter ? { name: { $regex: filter, $options: 'i' } } : {};
    const skip = (page - 1) * limit;
    const sort = { [sortField]: sortOrder as SortOrder };
    return EmployeeModel.find(query).sort(sort).skip(skip).limit(limit);
  }

  /**
   * Get a single employee by ID.
   * @param id Employee ID
   */
  async getEmployeeById(id: string): Promise<EmployeeDocument | null> {
    return EmployeeModel.findById(id);
  }

  /**
   * Create a new employee.
   * @param data Employee data
   */
  async createEmployee(data: any): Promise<EmployeeDocument> {
    const employee = new EmployeeModel(data);
    return employee.save();
  }
}
