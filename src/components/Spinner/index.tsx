import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

type Spn = {
    icon: keyof typeof MaterialIcons.glyphMap,
    color: string
    size: number
}

export function SpinnerIcon({ icon, color, size }: Spn) {
    const spinValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 800,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start()
    }, [])

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <MaterialIcons name="autorenew" size={size} color={color} />
        </Animated.View>
    )
}
