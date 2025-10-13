import { MaterialIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    name: string
    icon: keyof typeof MaterialIcons.glyphMap
    //variant?: "primary" | "secondary"
    color: string
}

export function Option({ name, icon, color = "#000", ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <MaterialIcons
                name={icon}
                size={20}
                color={color}
            />

            <Text style={{ textAlign: "center", color, marginLeft: 8 }}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}