import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Dropdown } from "react-native-element-dropdown";

import {
  JadwalContext,
  BandaraContext,
  MaskapaiContext,
} from "../Context/GlobalContext";

const Home = ({ route, navigation }) => {
  const [jadwal] = useContext(JadwalContext);
  const [bandara] = useContext(BandaraContext);
  const [maskapai] = useContext(MaskapaiContext);

  const tanggalFilter = [];

  jadwal.map((item) => {
    tanggalFilter.push(item.jadwal_tanggal);
  });

  const tanggalFilterUniq = [...new Set(tanggalFilter)];

  const objTanggal = tanggalFilterUniq.map((item) => {
    return { label: item, value: item };
  });

  const [bandaraKeberangkatan, setBandaraKeberangkatan] = useState(null);
  const [bandaraTujuan, setBandaraTujuan] = useState(null);
  const [tanggalKeberangkatan, setTanggalKeberangkatan] = useState(null);

  // const [value, setValue] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="defaults" />
      <View style={[styles.item, styles.itemTop]}>
        <View style={styles.itemChildTop}>
          <Icon name="bars" size={30} color="#fff" />
          <Icon name="user" size={30} color="#fff" />
        </View>
        <View style={styles.itemChildBot}>
          <Text style={styles.title}>Hiling.id</Text>
        </View>
      </View>
      <View style={[styles.item, styles.itemBottom]}>
        <Text style={styles.footerText}>Copyright Elang - 120140194</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.labelForm}>Lokasi Keberangkatan</Text>
        <View style={styles.inputContainer}>
          <View style={styles.icon}>
            <Icon name="plane-departure" size={20} color="#86b257" />
          </View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.label}
            data={bandara}
            search
            labelField="bandara_kode"
            valueField="bandara_kode"
            placeholder={!isFocus1 ? "Masukan Lokasi Keberangkatan" : "..."}
            searchPlaceholder="Search..."
            value={bandaraKeberangkatan}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={(item) => {
              setBandaraKeberangkatan(item.bandara_kode);
              setIsFocus1(false);
            }}
          />
        </View>
        <Text style={styles.labelForm}>Lokasi Tujuan</Text>
        <View style={styles.inputContainer}>
          <View style={styles.icon}>
            <Icon name="plane-arrival" size={20} color="#86b257" />
          </View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.label}
            data={bandara}
            search
            labelField="bandara_kode"
            valueField="bandara_kode"
            placeholder={!isFocus2 ? "Masukan Lokasi Tujuan" : "..."}
            searchPlaceholder="Search..."
            value={bandaraTujuan}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={(item) => {
              setBandaraTujuan(item.bandara_kode);
              setIsFocus2(false);
            }}
          />
        </View>
        <Text style={styles.labelForm}>Tanggal Keberangkatan</Text>
        <View style={styles.inputContainer}>
          <View style={styles.icon}>
            <Icon name="calendar" size={25} color="#86b257" />
          </View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.label}
            data={objTanggal}
            dropdownPosition={"bottom"}
            search
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder={!isFocus3 ? "Masukan Tanggal Keberangkatan" : "..."}
            searchPlaceholder="Search..."
            value={tanggalKeberangkatan}
            onFocus={() => setIsFocus3(true)}
            onBlur={() => setIsFocus3(false)}
            onChange={(item) => {
              setTanggalKeberangkatan(item.value);
              setIsFocus3(false);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Detail", {
              bandaraKeberangkatan: bandaraKeberangkatan,
              bandaraTujuan: bandaraTujuan,
              tanggalKeberangkatan: tanggalKeberangkatan,
            });
            setBandaraKeberangkatan(null);
            setBandaraTujuan(null);
            setTanggalKeberangkatan(null);
          }}
        >
          <Text style={styles.buttonText}>Cari</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  item: {
    width: "100%",
    flex: 1,
    backgroundColor: "#86b257",
  },
  itemTop: {
    flex: 2,
    backgroundColor: "#86b257",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    paddingTop: 50,
  },
  itemBottom: {
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  footerText: {
    color: "#888",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemChildTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemChildBot: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  form: {
    width: "85%",
    backgroundColor: "#ffffff",
    padding: 25,
    position: "absolute",
    top: 170,
    borderRadius: 10,
    elevation: 20,
  },
  labelForm: {
    fontSize: 18,
    fontWeight: "900",
    color: "#4f4f4f",
  },
  inputContainer: {
    backgroundColor: "#ffff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    padding: 10,
    borderColor: "#f1f1f1",
    borderWidth: 3,
  },
  input: {
    flex: 5,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ed7d31",
    color: "#fff",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdown: {
    flex: 5,
    marginLeft: 10,
    fontSize: 18,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    top: -50,
    zIndex: 999,
    fontSize: 14,
    width: "55.5%",
  },
  placeholderStyle: {
    fontSize: 12,
    color: "#4f4f4f",
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  inputSearchStyle: {
    fontSize: 12,
  },
});

export default Home;
