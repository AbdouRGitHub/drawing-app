import {
  Pressable,
  View,
  Text,
  FlatListProps,
  StyleProp,
  ViewProps,
  ListRenderItemInfo,
} from "react-native";
import roomStyles from "../../../styles/Room/Room";
import { useState } from "react";

interface RoomListItemProps {
  dataItem: ListRenderItemInfo<any>;
}
interface ModalProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function RoomListItem(
  { dataItem }: RoomListItemProps,
  { setModalVisible }: ModalProps
) {
  return (
    <View>
      <Text >{dataItem.item.name}</Text>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text> accéder </Text>
      </Pressable>
    </View>
  );
}
