import React, { Fragment, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import {
  Button,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

export default function CameraScreen({navigation}) {
  const cameraRef = useRef();

  const [hasPermission, setHasPermission] = useState(null);
  const [imagesArr, setImagesArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const sendImageToOrder = (image) => {
    addToCurrentOrder(image); // Tilføj billedet til den aktuelle ordre
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== "granted") {
        alert("Tilladelse til kameraet blev ikke givet.");
        return;
      }
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Beklager, vi har brug for tilladelse til kamerarulle for at dette kan fungere."
          );
        }
      }

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View></View>;
  } else if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title={"Change settings"}
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }
  const snap = async () => {
    if (!cameraRef.current) {
      return;
    }
    setLoading(true);
    const result = await cameraRef.current.takePictureAsync();

    setImagesArr((imagesArr) => [result].concat(imagesArr));
    sendImageToOrder(result.uri); // Send billedet til MadPakker
    setLoading(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImagesArr((imagesArr) => [result].concat(imagesArr));
    }
  };

  const CameraGallery = () => {
    return (
      <View style={{ flex: 0.4, alignContent: "center" }}>
        <Text>{imagesArr.length}</Text>
        <ScrollView horizontal={true}>
          {imagesArr.length > 0 ? (
            imagesArr.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={{ paddingHorizontal: 10 }}
                onPress={() =>
                  navigation.navigate("image", { image: image.uri })
                }
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 100, height: 200 }}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: "white" }}> No images taken </Text>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <Fragment>
      <StatusBar
        StatusBarStyle="dark-content"
        style={{ fontcolor: "white" }}
        backgroundColor={"rgba(255,255,255,0.4)"}
      />
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View
            style={{
              flexDirection: "column",
              alignContent: "center",
              flex: 1,
              padding: 20,
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>

              {/*Gir sig selv*/}
              <TouchableOpacity style={styles.button} onPress={snap}>
                <Text style={styles.text}>
                  {loading ? "Loading..." : "Tag billede"}
                </Text>
              </TouchableOpacity>

              {/*Skift retning på kamera*/}
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.text}> Galleri </Text>
              </TouchableOpacity>
            </View>
            <CameraGallery />
          </View>
        </Camera>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 5,
  },
  buttonGallery: {
    fontSize: 15,
    color: "white",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    padding: 5,
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  gallery: {
    flex: 0.4,
    paddingTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
