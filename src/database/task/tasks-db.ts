import { PropTask } from '@/components/Task';
import * as taskSchema from '@/database/schemas/taskSchema';
import { eq } from 'drizzle-orm';
import { connectDatabase, DbConnection } from '../Connection';

export async function updatetask(id: number, { db }: DbConnection, { task }: Omit<PropTask, 'id' | 'status'>) {
    try {
        await db.update(taskSchema.tasks).set({
            title: task.title,
            description: task.description,
            schedule: task.schedule,
            priority: task.priority
        }).where(eq(taskSchema.tasks.id, id))

    } catch (error) {
        console.log("UPDATE - TASK ", error)
        throw error;
    }
}

export async function updatestatus(id: number, nextStatus: string) {
    const { db } = connectDatabase()
    try {
        await db.update(taskSchema.tasks).set({
            status: nextStatus
        }).where(eq(taskSchema.tasks.id, id))
    } catch (error) {
        console.log("UPDATE - STATUS ", error)
        throw error;
    }
}

export async function taskdelete(id: number, { database, db }: DbConnection) {
    try {
        await db.delete(taskSchema.tasks).where(eq(taskSchema.tasks.id, id))
    } catch (error) {
        console.log("DELETE :", error)
        throw error
    }
}

