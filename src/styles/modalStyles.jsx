import { Dimensions, StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
    transform: [
      {
        translateY: "-50%",
      },
    ],
  },

  card: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 500
  },

  btnStyle: {
    resizeMode: "contain",
    width: 100,
  },

  imageStyle: {
    width: "100%",
    resizeMode: "contain",
    position: "absolute",
  },

  btnContainer: {
    width: 230,
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 32,
    color: "white",
    padding:16,
    textAlign: "center",
    width: 260,
    fontFamily: "LilitaOne-Regular",
  },
  bodyText: {
    color: "white",
    marginVertical: 12,
    width: 250,
    textAlign: "center",
    fontSize: 18,
  },
});
