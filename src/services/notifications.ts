import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';

export async function setupChannel() {
    const id = await notifee.createChannel({
        id: '1',
        name: 'Remainder',
        importance: AndroidImportance.HIGH,
    });
    return id;
}

export async function solicitarPermissao() {
    await notifee.requestPermission();
}

export async function agendarLembrete(title: string, body: string, date: Date) {


    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
    };
    const channelid = await setupChannel();
    const id = await notifee.createTriggerNotification(
        {
            title,
            body,
            android: {
                channelId: channelid
            }
        },
        trigger
    );

    return id;
}


export async function cancelarLembrete(id: string) {
    await notifee.cancelNotification(id);
}
