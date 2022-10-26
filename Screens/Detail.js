import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { useContext } from "react";

import {
  JadwalContext,
  BandaraContext,
  MaskapaiContext,
} from "../Context/GlobalContext";

const Detail = ({ route, navigation }) => {
  const { bandaraKeberangkatan, bandaraTujuan, tanggalKeberangkatan } =
    route.params;
  const [jadwal] = useContext(JadwalContext);
  const [bandara] = useContext(BandaraContext);
  const [maskapai] = useContext(MaskapaiContext);

  const dataFilter = jadwal.filter((item) => {
    if (
      bandaraKeberangkatan === null &&
      bandaraTujuan === null &&
      tanggalKeberangkatan === null
    ) {
      return item;
    } else if (
      bandaraKeberangkatan === null &&
      bandaraTujuan === null &&
      tanggalKeberangkatan !== null
    ) {
      return item.jadwal_tanggal === tanggalKeberangkatan;
    } else if (
      bandaraKeberangkatan === null &&
      bandaraTujuan !== null &&
      tanggalKeberangkatan === null
    ) {
      return item.bandara_kode_tujuan === bandaraTujuan;
    } else if (
      bandaraKeberangkatan !== null &&
      bandaraTujuan === null &&
      tanggalKeberangkatan === null
    ) {
      return item.bandara_kode_keberangkatan === bandaraKeberangkatan;
    } else if (
      bandaraKeberangkatan !== null &&
      bandaraTujuan !== null &&
      tanggalKeberangkatan === null
    ) {
      return (
        item.bandara_kode_keberangkatan === bandaraKeberangkatan &&
        item.bandara_kode_tujuan === bandaraTujuan
      );
    } else if (
      bandaraKeberangkatan !== null &&
      bandaraTujuan === null &&
      tanggalKeberangkatan !== null
    ) {
      return (
        item.bandara_kode_keberangkatan === bandaraKeberangkatan &&
        item.jadwal_tanggal === tanggalKeberangkatan
      );
    } else if (
      bandaraKeberangkatan === null &&
      bandaraTujuan !== null &&
      tanggalKeberangkatan !== null
    ) {
      return (
        item.bandara_kode_tujuan === bandaraTujuan &&
        item.jadwal_tanggal === tanggalKeberangkatan
      );
    }
    return (
      item.bandara_kode_keberangkatan === bandaraKeberangkatan &&
      item.bandara_kode_tujuan === bandaraTujuan &&
      item.jadwal_tanggal === tanggalKeberangkatan
    );
  });

  const logoMaskapai = {
    "Garuda Indonesia": require("../assets/logo/garudaIndonesia.png"),
    "Lion Air": require("../assets/logo/lionAir.png"),
    Citilink: require("../assets/logo/citilink.png"),
    "Batik Air": require("../assets/logo/batikAir.png"),
    "Sriwijaya Air": require("../assets/logo/sriwijayaAir.png"),
  };

  const getMaskapaiNama = (kode) => {
    const data = maskapai.filter((item) => {
      return item.maskapai_id === kode;
    });
    return data[0].maskapai_nama;
  };

  const getMaskapaiLogo = (kode) => {
    const data = maskapai.filter((item) => {
      return item.maskapai_id === kode;
    });
    return logoMaskapai[data[0].maskapai_nama];
  };

  const getBandara = (kode) => {
    const data = bandara.filter((item) => {
      return item.bandara_kode === kode;
    });
    return data[0].bandara_nama;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="defaults" />
      <View style={[styles.item, styles.itemTop]}>
        <View style={styles.itemChildTop}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Hiling.id</Text>
          <Icon name="user" size={30} color="#fff" />
        </View>
        <View style={styles.itemChildBottom}>
          <Text style={styles.text}>Hasil Pencarian Penerbangan</Text>
          <Text style={styles.text}>(Tanggal Keberangkatan)</Text>
        </View>
      </View>
      <View style={[styles.item, styles.itemBottom]}>
        <View style={styles.resultContainer}>
          <FlatList
            data={dataFilter}
            renderItem={({ item }) => (
              <View style={styles.result} key={item.jadwal_id}>
                <View style={styles.resultTop}>
                  <Text
                    style={[
                      styles.resultTextTop,
                      { flex: 2, textAlign: "left" },
                    ]}
                  >
                    {getBandara(item.bandara_kode_keberangkatan)}
                  </Text>
                  <Text
                    style={[
                      styles.resultTextTop,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {" "}
                    -{" "}
                  </Text>
                  <Text
                    style={[
                      styles.resultTextTop,
                      { flex: 2, textAlign: "right" },
                    ]}
                  >
                    {getBandara(item.bandara_kode_tujuan)}
                  </Text>
                </View>
                <View style={styles.resultBot}>
                  <View style={styles.resultBotLeft}>
                    <Image
                      source={getMaskapaiLogo(item.maskapai_id)}
                      style={{ width: 50, height: 50, resizeMode: "contain" }}
                    />
                    <Text style={[styles.resultTextBottom, { marginLeft: 15 }]}>
                      {getMaskapaiNama(item.maskapai_id)}
                    </Text>
                  </View>
                  <View style={styles.resultBotRight}>
                    <Text style={[styles.resultTextBottom, { color: "blue" }]}>
                      {item.jadwal_tanggal}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Copyright Elang - 120140194</Text>
        </View>
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
    flex: 1,
    backgroundColor: "#86b257",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    paddingTop: 50,
  },
  itemBottom: {
    flex: 4,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    paddingBottom: 0,
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
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
  itemChildBottom: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  resultContainer: {
    flex: 4,
    width: "100%",
  },
  result: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    elevation: 10,
  },
  resultTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultBot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  resultBotLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  resultBotRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  resultTextTop: {
    fontSize: 15,
    fontWeight: "500",
    color: "black",
  },
  resultTextBottom: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
});

export default Detail;
