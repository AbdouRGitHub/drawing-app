import { Modal, Pressable, View, Text, TextInput } from "react-native";
import roomStyles from "../../../styles/Room/Room";
import { useReducer } from "react";
import { createRoom, joinRoom } from "../../../service/RoomService";

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddRoomModal({ modalVisible, setModalVisible }: ModalProps) {
  const [formValue, dispatch] = useReducer(addRoomReducer, { name: "", password: "" });

  function addRoomReducer(state: any, action: any) {
    switch (action.type) {
      case "name": {
        return {
          ...state,
          name: action.value,
        };
      }
      case "password": {
        return {
          ...state,
          password: action.value,
        };
      }
      default:
        return state;
    }
  }

  async function addRoomHandler() {
    createRoom(formValue.name, formValue.password);
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={roomStyles.modal_container}>
        <Text> Nom du salon </Text>
        <TextInput
          value={formValue.name}
          onChangeText={(text) => {
            dispatch({ type: "name", value: text });
          }}
          maxLength={20}
          style={{ borderColor: "blue", borderWidth: 1, borderRadius: 5, width: 100 }}
        />
        <Text> Code d'accès du salon </Text>
        <TextInput
          value={formValue.password}
          onChangeText={(text) => {
            dispatch({ type: "password", value: text });
          }}
          secureTextEntry={true}
          maxLength={20}
          style={{ borderColor: "blue", borderWidth: 1, borderRadius: 5, width: 100 }}
        />
        <Pressable
          style={[roomStyles.modal_submit_button, { backgroundColor: "green" }]}
          onPress={addRoomHandler}>
          <Text>Ajouter</Text>
        </Pressable>
        <Pressable
          style={roomStyles.modal_submit_button}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text>Fermer</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
