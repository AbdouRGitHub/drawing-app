import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { defaultStyles } from "../styles/Global/Global";
import {
  View,
  Text,
  Keyboard,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Pressable,
  Image,
} from "react-native";
import { userInfo } from "../service/AuthService";
import roomStyles from "../styles/Room/Room";
import AccessRoomModal from "../components/Modal/Room/AccessRoomModal";
import AddRoomModal from "../components/Modal/Room/AddRoomModal";
import { get, getDatabase, onValue, ref } from "firebase/database";
import { app } from "../firebase/config";

export default function Room({ navigation }: any) {
  const [accessRoomModalVisible, setAccessRoomModalVisible] = useState(false);
  const [addRoomModalVisible, setAddRoomModalVisible] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [email, setEmail] = useState('');
  const [roomName, setRoomName] = useState("");
  const [arrayRoom, setArrayRoom] = useState<string[]>([]);
  const database = getDatabase(app);

  useEffect(() => {
    async function fetchPayload() {
      const token: string | null = await SecureStore.getItemAsync("token");
      if (token) {
        const data = await userInfo(token);
        setEmail(data.users[0].email);
      } else {
        navigation.goBack();
      }
    }
    fetchPayload();
  }, []);

  onValue(ref(database, `room`), (snapshot) => {
    snapshot.forEach((child) => {
      if (!arrayRoom.includes(child.key)) {
        setArrayRoom([...arrayRoom, child.key]);
      }
    });
  });

  async function refresh() {
    await (
      await get(ref(database, `room`))
    ).forEach((child) => {
      if (!arrayRoom.includes(child.key)) {
        arrayRoom.push(child.key);
      }
    });
    setRefreshList(false);
  }
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={defaultStyles.header}>
          <Pressable
            onPressOut={async () => {
              await SecureStore.deleteItemAsync("token");
              navigation.navigate("Login");
            }}>
            <Image
              style={{ left: 320, height: 30, width: 30 }}
              source={require("../assets/button_icon/return.png")}
            />
          </Pressable>
        </View>
        <View style={roomStyles.body}>
          <AddRoomModal
            modalVisible={addRoomModalVisible}
            setModalVisible={setAddRoomModalVisible}
          />
          <AccessRoomModal
            modalVisible={accessRoomModalVisible}
            setModalVisible={setAccessRoomModalVisible}
            navigation={navigation}
            email={email}
            roomName={roomName}
          />
          <FlatList
            scrollEnabled={true}
            refreshing={refreshList}
            onRefresh={() => {
              refresh();
            }}
            data={arrayRoom}
            renderItem={(room) => {
              return (
                <View style={roomStyles.view_display}>
                  <Text style={roomStyles.text}>{room.item}</Text>
                  <Pressable
                    style={roomStyles.button}
                    onPress={() => {
                      setRoomName(room.item);
                      setAccessRoomModalVisible(true);
                    }}>
                    <Text style={{ textAlign: "center" }}> accéder </Text>
                  </Pressable>
                </View>
              );
            }}
            contentContainerStyle={roomStyles.container}
          />
          <View
            style={{
              height: 70,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: 12,
            }}>
            <Pressable
              onPress={() => {
                setAddRoomModalVisible(true);
              }}>
              <Image
                style={{ flex: 1, height: 50, width: 50 }}
                source={require("../assets/button_icon/plus.png")}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
