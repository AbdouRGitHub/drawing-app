import {
  Modal,
  Pressable,
  View,
  Text,
  TextInput,
  ListRenderItemInfo,
} from "react-native";
import roomStyles from "../../../styles/Room/Room";
import { useState } from "react";
import { joinRoom } from "../../../service/RoomService";

interface ModalProps {
  roomName: string;
  email: string;
  navigation: any;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AccessRoomModal({
  roomName,
  email,
  navigation,
  modalVisible,
  setModalVisible,
}: ModalProps) {
  const [errorText, setErrorText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  async function accessRoomHandler() {
    const response = await joinRoom(roomName, passwordText);
    if (response.type == "SUCCESS") {
      setModalVisible(false);
      navigation.navigate('Board', {
        roomName: roomName,
        email: email
      });
    } else if (response.type == "ERROR") {
      setErrorText(response.value);
    }
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
        <Text style={{ color: "red", textAlign: "center" }}>{errorText}</Text>
        <Text> Entrer le code d'accès du salon</Text>
        <TextInput
          secureTextEntry={true}
          value={passwordText}
          onChangeText={(textValue) => {
            setPasswordText(textValue);
          }}
          maxLength={20}
          style={{ borderColor: "blue", borderWidth: 1, borderRadius: 5, width: 100 }}
        />
        <Pressable
          style={[roomStyles.modal_submit_button, { backgroundColor: "orange" }]}
          onPress={accessRoomHandler}>
          <Text>Accéder</Text>
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
