import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Detail from "./Screens/Detail";

import {
  JadwalContext,
  MaskapaiContext,
  BandaraContext,
} from "./Context/GlobalContext";

const Stack = createNativeStackNavigator();

const App = () => {
  const jadwal = require("./data/jadwal.json");
  const maskapai = require("./data/maskapai.json");
  const bandara = require("./data/bandara.json");

  return (
    <JadwalContext.Provider value={[jadwal]}>
      <MaskapaiContext.Provider value={[maskapai]}>
        <BandaraContext.Provider value={[bandara]}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
          </NavigationContainer>
        </BandaraContext.Provider>
      </MaskapaiContext.Provider>
    </JadwalContext.Provider>
  );
};

export default App;
