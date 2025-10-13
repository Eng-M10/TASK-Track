import { Option } from "@/components/Option";
import { task } from "@/components/Task";
import { colors } from "@/constants/colors";
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";
type Props = {
    task: task
    showModal: boolean
    setShowModal: (show: boolean) => void
}


export function Details({ task, showModal, setShowModal }: Props) {


    async function handleDelete() {
        //taskdelete(task.id, { db })
    }
    function handleUpdate() {
        console.log("update")
    }
    function handleUpdateStatus() {
        console.log("update status")
    }

    return (
        <Modal transparent visible={showModal}
            animationType='slide'
            allowSwipeDismissal={true}
            statusBarTranslucent
        >
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                <View style={styles.modal}>

                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalCategory}>Task</Text>

                                <TouchableOpacity onPress={() => setShowModal(false)}>
                                    <MaterialIcons
                                        name="close"
                                        size={24}
                                        color={colors.gray[400]}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.modalLinkName}>{task.title}</Text>
                            <Text style={styles.modalUrl}>{task.description}</Text>
                            <View style={styles.options}>
                                <Option icon="edit" name="Update" color={colors.blue[800]} onPress={handleUpdate} />
                                <Option icon="delete" name="Delete" color="red" onPress={handleDelete} />
                                <Option icon="arrow-forward-ios" name="Check" color="green" onPress={handleUpdateStatus} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}