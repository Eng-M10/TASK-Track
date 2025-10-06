import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';


export const tasks = sqliteTable('tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    description: text('description'),
    status: text('status').notNull().default('todo'),
    schedule: integer('schedule', { mode: 'timestamp' }).$default(() => sql`(CURRENT_TIMESTAMP)`).notNull(),
    priority: integer('priority').notNull().default(1),
    createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => sql`(CURRENT_TIMESTAMP)`).notNull(),

});