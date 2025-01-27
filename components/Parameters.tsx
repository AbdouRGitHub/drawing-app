import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { SoundContext } from "../context/SoundContext";
import { defaultStyles } from "../styles/Global/Global";
import colors from "../styles/Global/Colors";

const Parameters = () => {
  const [visible, setVisible] = useState(false);
  const sound = useContext(SoundContext);

  return (
      <TouchableOpacity style={style.container} onPress={() => setVisible(true)}>
        <Ionicons name="ios-settings-sharp" size={24} color="#fff" />
        <Modal visible={visible} animationType={'fade'} transparent={true}>
          <View style={style.modal}>
            <View style={style.window}>
              <LinearGradient colors={['#041775', '#02011f']} style={defaultStyles.bgGradient}/>
              <Text style={style.title}>Paramètres</Text>
              <View style={style.parameter}>
                <BouncyCheckbox
                  size={18}
                  fillColor={colors.secondary}
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{textDecorationLine: 'none'}}
                  innerIconStyle={{ borderWidth: 1.5 }}
                  onPress={() => sound.setIsMuted(!sound.isMuted)}
                  text={'Musique'}
                />
              </View>
              <TouchableOpacity style={{position: 'absolute', top: 20, right: 20}} onPress={() => setVisible(false)}>
                <AntDesign name="close" size={24} color={colors.secondary}/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'relative'
  },
  window: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderRadius: 20,
    borderColor: '#fff',
  },
  parameter: {
    paddingHorizontal: 30
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20
  }
})

export default Parameters;