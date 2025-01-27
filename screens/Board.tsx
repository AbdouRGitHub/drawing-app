import React, { useEffect, useState } from "react";
import { Pressable, View, Image, Modal, LogBox } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { get, getDatabase, onValue, ref, remove, update } from "firebase/database";
import { app } from "../firebase/config";

interface IPath {
  segments: string[];
  color?: string;
  user: string;
}

interface BoardProps {
  route: any;
  navigation: any;
  roomName: string;
  email: string;
}
export default function Board({ route, navigation }: any) {
  const { roomName, email } = route.params;
  const [paths, setPaths] = useState<IPath[]>([]);
  const [chatModalVisible, setChatModalVisible] = useState<boolean>(false);
  const database = getDatabase(app);

  useEffect(() => {
    LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);
    onValue(ref(database, `room/${roomName}/draw`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPaths(data);
      }
    });
  }, []);

  async function deleteDraw() {
    (await get(ref(database, `room/${roomName}/draw`))).forEach((child) => {
      if (child.child("user").val() == email) {
        remove(ref(database, `room/${roomName}/draw/${child.key}`));
      }
    });
    setPaths([]);
  }

  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: "#06d6a0",
        user: email,
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
    })
    .onEnd(async () => {
      const newPaths = [...paths];
      await update(ref(database, `room/${roomName}`), {
        draw: newPaths,
      });
    })
    .minDistance(1);

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <View style={{ flex: 1, backgroundColor: "black" }}>
            <Canvas style={{ flex: 8 }}>
              {paths.map((p, index) => (
                <Path
                  key={index}
                  path={p.segments.join(" ")}
                  strokeWidth={5}
                  style="stroke"
                  color={p.color}
                />
              ))}
            </Canvas>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
                alignItems: "flex-start",
                backgroundColor: "black",
              }}>
              <Pressable onPress={deleteDraw}>
                <Image
                  source={require("../assets/button_icon/trash.png")}
                  style={{ height: 40, width: 40 }}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={require("../assets/button_icon/color_picker.png")}
                  style={{ height: 40, width: 40 }}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={require("../assets/button_icon/close.png")}
                  style={{ height: 40, width: 40 }}
                />
              </Pressable>
            </View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}
