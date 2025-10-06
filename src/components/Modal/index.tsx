import { task } from "@/components/Task";
import { colors } from "@/constants/colors";
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Props = {
    task: task
    showModal: boolean
    setShowModal: (show: boolean) => void
}


export function Details({ task, showModal, setShowModal }: Props) {


    return (
        <Modal transparent visible={showModal} animationType='slide'>
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalCategory}>{task.status}</Text>

                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <MaterialIcons
                                name="close"
                                size={20}
                                color={colors.gray[400]}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.modalLinkName}>
                        {task.title}
                    </Text>

                    <Text style={styles.modalUrl}>
                        {task.description}
                    </Text>

                    {/* <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove} />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View> */}
                </View>
            </View>
        </Modal>
    )
}