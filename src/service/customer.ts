import { DatabaseProvider } from "../database";
import { Customer } from "../models/customer";

export class CustomerService {
  public async getAll(): Promise<Customer[]> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getRepository(Customer).find();
  }

  public async getById(id: number): Promise<Customer> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getRepository(Customer).findOneById(id);
  }

  public async create(customer: Customer): Promise<Customer> {
    const connection = await DatabaseProvider.getConnection();
    return await connection.getRepository(Customer).save(customer);
  }

  public async update(id: number, customer: Customer): Promise<Customer> {
    const connection = await DatabaseProvider.getConnection();
    const entity = await connection.getRepository(Customer).findOneById(id);
    entity.firstName = customer.firstName;
    entity.lastName = customer.lastName;
    return await connection.getRepository(Customer).save(entity);
  }

  public async delete(id: number): Promise<Customer> {
    const connection = await DatabaseProvider.getConnection();
    const entity = await connection.getRepository(Customer).findOneById(id);
    return await connection.getRepository(Customer).remove(entity);
  }
}

export const customerService = new CustomerService();
