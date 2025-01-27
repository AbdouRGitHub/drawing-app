import { Text, TextInput, View } from "react-native";

interface InputDataProps {
  label: string;
  optionTextInput: any;
}

export default function LoginInput({ label, optionTextInput }: InputDataProps) {
  return (
    <View style={{ margin: 5 }}>
      <Text style={{ margin: 5 }}>{label}</Text>
      <TextInput
        style={{ borderColor: "blue", borderWidth: 1, borderRadius: 5 }}
        {...optionTextInput}
      />
    </View>
  );
}
