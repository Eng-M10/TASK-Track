import * as schema from "@/database/schemas/taskSchema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

export type DbConnection = {
    database: SQLite.SQLiteDatabase;
    db: ReturnType<typeof drizzle>;
};

let connection: DbConnection | null = null;

export function connectDatabase(): DbConnection {
    if (connection) return connection;

    const database = SQLite.openDatabaseSync("tasks.db");
    const db = drizzle(database, { schema });

    connection = { database, db };
    return connection;
}
