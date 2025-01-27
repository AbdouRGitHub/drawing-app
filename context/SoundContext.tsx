import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Sound } from "expo-av/build/Audio/Sound";
import { Audio } from "expo-av";
interface ISoundContext {
  isMuted: boolean,
  setIsMuted: (val: boolean) => void
}
export const SoundContext = createContext<ISoundContext>({
  isMuted: false,
  setIsMuted: () => {}
});
interface ISoundProvider {
  children?: ReactNode
}
const SoundProvider = ({children}: ISoundProvider) => {
  const [sound, setSound] = useState<Sound>();
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/cruising-down-8bit-lane-159615.mp3'),
      { shouldPlay: true, isLooping: true }
    );
    setSound(sound);
  }

  useEffect(() => {
    playSound();
      return () => {
        if (sound) {
          sound.unloadAsync()
        }
      };
  }, []);

  useEffect(() => {
    setIsMuted(isMuted);
    sound?.setIsMutedAsync(isMuted);
  }, [isMuted]);

  return (
    <SoundContext.Provider value={{ isMuted, setIsMuted }}>
      {children}
    </SoundContext.Provider>
  );
}

export default SoundProvider;