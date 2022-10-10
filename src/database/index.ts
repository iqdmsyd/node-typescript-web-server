import { Connection, createConnection } from "typeorm";
import { Customer } from "../models/customer";

export interface DatabaseConfiguration {
  type: "postgres";
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  ssl?: boolean;
}

export class DatabaseProvider {
  private static configuration: DatabaseConfiguration;
  private static connection: Connection;

  public static configure(config: DatabaseConfiguration): void {
    DatabaseProvider.configuration = config;
  }

  public static async getConnection(): Promise<Connection> {
    if (DatabaseProvider.connection) {
      return DatabaseProvider.connection;
    }

    if (!DatabaseProvider.configuration) {
      throw new Error("Database is not configured yet");
    }

    const { type, username, password, database, host, port, ssl } =
      DatabaseProvider.configuration;
    DatabaseProvider.connection = await createConnection({
      type,
      username,
      password,
      database,
      host,
      port,
      extra: { ssl },
      entities: [Customer],
      synchronize: true,
    });

    return DatabaseProvider.connection;
  }
}
