import { get, getDatabase, increment, ref, set } from "firebase/database";
import { app, firebaseConfig } from "../firebase/config";

export async function createRoom(name: string, password: string) {
  const database = await getDatabase(app);

  set(ref(database, `room/${name}`), {
    password: password,
    key: increment(1),
    draw: {}
  });
}

export async function joinRoom(name: string, password: string) {
  const database = await getDatabase(app);
  
  const passwordRoom = (await get(ref(database, `room/${name}`))).val().password;

  if(passwordRoom == password) {
    return { type: 'SUCCESS', value: 'Bon code'};
  } else {
    return { type: 'ERROR', value: 'Code incorrect'};
  }
}