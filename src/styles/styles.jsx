import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonOpacity: {
    width: "80%",
  },
  button: {
    backgroundColor: "#FDB813",
    // backgroundColor: "#FFDE4F",
    padding: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 8px 16px rgba(0,0,0,0.33)",
  },
  buttonText: {
    color: "white",
    fontFamily: "LilitaOne-Regular",
    fontSize: 24,
    // fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { height: 1 },
    textShadowRadius: 12,
    padding: 8,
  },
  entryBackground: {
    width: "100%",
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2C519F",
    padding: 24,
    marginVertical: 24,
    marginHorizontal: "auto",
    borderRadius: 24,
    boxShadow: "0px 2px 12px #EDE09480",
    borderWidth: 8,
    borderColor: "#FFD41C",
  },
  entryTitle: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 12,
    textAlign: "center",
    fontFamily: "LilitaOne-Regular",
  },
  entryBody: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },

  homeRoundedIcon: {
    borderRadius: 99,
    backgroundColor: "white",
    padding: 12,
    borderColor: "black",
    borderWidth: 4,
  },
});

export default styles;
