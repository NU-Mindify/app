import BlackOrangeGirl from "./assets/avatar/blackOrangeGirl.svg";
import BlueMan from "./assets/avatar/blueMan.svg";
import OrangeMan from "./assets/avatar/orangeMan.svg";
import RedGirl from "./assets/avatar/redGirl.svg";
import WhiteMan from "./assets/avatar/whiteMan.svg";
import WhiteOrangeGirl from "./assets/avatar/whiteOrangeGirl.svg";

import abnormalMap from "./assets/maps/abnormalLong.png";
import developmentalMap from "./assets/maps/developmental.png";
import Map1 from "./assets/maps/1.png";
import Map2 from "./assets/maps/2.png";
import Map4 from "./assets/maps/4.png";

import category1 from './assets/categories/1.jpg';
import map2 from './assets/maps/2.png'
import map4 from './assets/maps/4.png'

const avatars = [
  BlackOrangeGirl,
  BlueMan,
  OrangeMan,
  RedGirl,
  WhiteMan,
  WhiteOrangeGirl,
];

const navbarRoutes = ["Home", "Chatbot", "Glossary", "Mindmap", "Levels"]

const categoriesObj = [
  {
    id: "abnormal",
    name: "Abnormal Psychology",
    level_background: abnormalMap,
    cover: category1,
    primary_color: "#3B3F2A",
    secondary_color: "#248552"
  },
  {
    id: "developmental",
    name: "Developmental Psychology",
    level_background: developmentalMap,
    cover: map2,
    primary_color: "#7F9F30",
    secondary_color: "#A9CA59"
  },
  {
    id: "psychological",
    name: "Psychological Assessment",
    level_background: Map4,
    cover: map4,
    primary_color: "#3C4F76"
  },
  {
    id: "industrial",
    name: "Industrial Psychology",
    level_background: Map2,
    cover: map2,
    primary_color: "#6C6C6C"
  },
  {
    id: "general",
    name: "General Psychology",
    level_background: Map1,
    cover: category1,
    primary_color:"#B7C9A8"
  },
]

const gameColors = {
  developmental: {
    background: ["#D0E796", "#7F9F30"],
    timer: ["#AFD02A", "#A1CA3D", "#AFD02A"],
    answerBorder: {
      inner: "#E48238",
      outer: "#A15A24"
    }
  },
  abnormal: {
    background: ["#7A825B", "#1E2921"],
    timer: ["#8AFFC1", "#6ECC9A", "#539974"],
    answerBorder: {
      inner: "#3B3F2A",
      outer: "#248552"
    }
  }
}

const branches = [
  {
    id: "moa",
    name: "NU MOA",
    extension: 'nu-moa.edu.ph'
  },
  {
    id: "manila",
    name: "NU Manila",
    extension: 'nu-manila.edu.ph'
  },
  {
    id: "baliwag",
    name: "NU Baliwag",
    extension: 'nu-baliwag.edu.ph'
  },
  {
    id: "fairview",
    name: "NU Fairview",
    extension: 'nu-fairview.edu.ph'
  },
  {
    id: "eastortigas",
    name: "NU East-Ortigas",
    extension: 'nu-east-ortigas.edu.ph'
  },
  {
    id: "laspinas",
    name: "NU Las Pinas",
    extension: 'nu-las-pinas.edu.ph'
  },
  {
    id: "lipa",
    name: "NU Lipa",
    extension: 'nu-lipa.edu.ph'
  },
  {
    id: "clark",
    name: "NU Clark",
    extension: 'nu-clark.edu.ph'
  },
  {
    id: "laguna",
    name: "NU Laguna",
    extension: 'nu-laguna.edu.ph'
  },
  {
    id: "dasmarinas",
    name: "NU Dasmarinas",
    extension: 'nu-dasmarinas.edu.ph'
  },
  {
    id: "bacolod",
    name: "NU Bacolod",
    extension: 'nu-bacolod.edu.ph'
  },
  {
    id: "cebu",
    name: "NU Cebu",
    extension: 'nu-cebu.edu.ph'
  }
]

const API_URL = process.env.EXPO_PUBLIC_URL;

export { API_URL, avatars, categoriesObj, gameColors, navbarRoutes, branches };