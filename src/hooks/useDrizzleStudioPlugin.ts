import { useDrizzleStudioPlugin } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
// Removed import of EventSubscription from react-native

export default function useDrizzleStudio(dbName: string) {
    const client = useDrizzleStudioPlugin();
    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

    const transferData = useCallback(async (e: {
        sql: string;
        params: (string | number)[];
        arrayMode: boolean;
        id: string;
    }) => {
        if (!db) return;
        try {

            const statement = await db.prepareAsync(e.sql);
            let executed;
            if (e.arrayMode) {
                executed = await statement.executeForRawResultAsync(e.params);
            } else {
                executed = await statement.executeAsync(e.params);
            }

            const data = await executed.getAllAsync();
            client?.sendMessage(`transferData-${e.id}`, { from: "app", data });
        } catch (error) {
            console.error(error);
        }
    }, [db, client]);

    useEffect(() => {
        const openDb = async () => {
            const newDb = await SQLite.openDatabaseAsync(dbName);
            setDb(newDb);
        };
        openDb();
    }, [dbName]);

    useEffect(() => {
        // Use 'any' or the specific type from expo-drizzle-studio-plugin if available
        const subscriptions: any[] = [];

        const subscription = client?.addMessageListener("getData", transferData);
        if (subscription) {
            subscriptions.push(subscription);
        }

        return () => {
            for (const subscription of subscriptions) {
                subscription?.remove();
            }
        };
    }, [client, transferData]);
}