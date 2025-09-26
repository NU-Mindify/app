import b1 from './assets/avatar/b1.svg'
import b2 from './assets/avatar/b2.svg'
import b3 from './assets/avatar/b3.svg'
import b4 from './assets/avatar/b4.svg'
import b5 from './assets/avatar/b5.svg'
import b6 from './assets/avatar/b6.svg'
import b7 from './assets/avatar/b7.svg'
import b8 from './assets/avatar/b8.svg'
import b9 from './assets/avatar/b9.svg'
import b10 from './assets/avatar/b10.svg'

import g1 from './assets/avatar/g1.svg'
import g2 from './assets/avatar/g2.svg'
import g3 from './assets/avatar/g3.svg'
import g4 from './assets/avatar/g4.svg'
import g5 from './assets/avatar/g5.svg'
import g6 from './assets/avatar/g6.svg'
import g7 from './assets/avatar/g7.svg'
import g8 from './assets/avatar/g8.svg'


import b1body from './assets/body/b1.svg'
import b2body from './assets/body/b2.svg'
import b3body from './assets/body/b3.svg'
import b4body from './assets/body/b4.svg'
import b5body from './assets/body/b5.svg'
import b6body from './assets/body/b6.svg'
import b7body from './assets/body/b7.svg'
import b8body from './assets/body/b8.svg'
import b9body from './assets/body/b9.svg'
import b10body from './assets/body/b10.svg'

import g1body from './assets/body/g1.svg'
import g2body from './assets/body/g2.svg'
import g3body from './assets/body/g3.svg'
import g4body from './assets/body/g4.svg'
import g5body from './assets/body/g5.svg'
import g6body from './assets/body/g6.svg'
import g7body from './assets/body/g7.svg'
import g8body from './assets/body/g8.svg'


import bulldog from './assets/avatar/bulldog.svg'
import bulldogbody from './assets/body/bulldog.svg'

import abnormalMap from "./assets/maps/abnormal.png";
import developmentalMap from "./assets/maps/developmental.png";
import organizationalMap from "./assets/maps/organizational.png";
import psychologicalMap from "./assets/maps/psychological.png";
import generalMap from "./assets/maps/general.png";


import abnormalCover from "./assets/categories/abnormalCover.png";
import developmentalCover from "./assets/categories/developmentalCover.png";
import industrialCover from "./assets/categories/industrialCover.png";
import psychologicalCover from "./assets/categories/psychologicalCover.png";
import generalCover from "./assets/categories/generalCover.png";


import corp1 from './assets/clothes/CORPORATE 1.svg'
import corp2 from './assets/clothes/CORPORATE 2.svg'
import corp3 from './assets/clothes/CORPORATE 3.svg'
import corp4 from './assets/clothes/CORPORATE 4.svg'
import corp5 from './assets/clothes/CORPORATE 5.svg'
import corp6 from './assets/clothes/CORPORATE 6.svg'
import fUnif from './assets/clothes/F UNIFORM.svg'
import mUnif from './assets/clothes/M UNIFORM.svg'

import ap1 from './assets/badges/ap1.png';
import ap2 from './assets/badges/ap2.png';
import ap3 from './assets/badges/ap3.png';
import ap4 from './assets/badges/ap4.png';
import ap5 from './assets/badges/ap5.png';
import ap6 from './assets/badges/ap6.png';
import ap7 from './assets/badges/ap7.png';
import ap8 from './assets/badges/ap8.png';
import ap9 from './assets/badges/ap9.png';
import ap10 from './assets/badges/ap10.png';

const VERSION = 0.1

const clothes = [
  { id:"female_unform", image: fUnif, },
  { id:"male_unform", image: mUnif, },
  { id:"blue_tie_pants", image: corp1, },
  { id:"black_suit_tie", image: corp2, },
  { id:"white_coat", image: corp3, },
  { id:"white_sweater", image: corp4, },
  { id:"white_formal", image: corp5, },
  { id:"gray_necklace", image: corp6, },
]

const avatars = [
  {id: "bulldog", head: bulldog, body: bulldogbody, gender: 'other'},
  {id: "b1", head: b1, body: b1body, gender:'male'},
  { id: "b2", head: b2, body: b2body, gender:'male'},
  { id: "b3", head: b3, body: b3body, gender:'male'},
  { id: "b4", head: b4, body: b4body, gender:'male'},
  { id: "b5", head: b5, body: b5body, gender:'male'},
  { id: "b6", head: b6, body: b6body, gender:'male'},
  { id: "b7", head: b7, body: b7body, gender:'male'},
  { id: "b8", head: b8, body: b8body, gender:'male'},
  { id: "b9", head: b9, body: b9body, gender:'male'},
  { id: "b10", head: b10, body: b10body, gender:'male'},
  { id: "g1", head: g1, body: g1body, gender:'female'},
  { id: "g2", head: g2, body: g2body, gender:'female'},
  { id: "g3", head: g3, body: g3body, gender:'female'},
  { id: "g4", head: g4, body: g4body, gender:'female'},
  { id: "g5", head: g5, body: g5body, gender:'female'},
  { id: "g6", head: g6, body: g6body, gender:'female'},
  { id: "g7", head: g7, body: g7body, gender:'female'},
  { id: "g8", head: g8, body: g8body, gender:'female'},
];

const navbarRoutes = ["Home", "Chatbot", "Glossary", "Mindmap", "Store", "Leaderboard"]

const categoriesObj = [
  {
    id: "developmental",
    name: "Developmental Psychology",
    level_background: developmentalMap,
    cover: developmentalCover,
    primary_color: "#7F9F30",
    secondary_color: "#A9CA59"
  },
  {
    id: "industrial",
    name: "Industrial / Organizational Psychology",
    level_background: organizationalMap,
    cover: industrialCover,
    primary_color: "#2C2C2C",
    secondary_color: "#7E7E7E"
  },
  {
    id: "abnormal",
    name: "Abnormal Psychology",
    level_background: abnormalMap,
    cover: abnormalCover,
    primary_color: "#3B3F2A",
    secondary_color: "#248552"
  },
  {
    id: "psychological",
    name: "Psychological Assessment",
    level_background: psychologicalMap,
    cover: psychologicalCover,
    primary_color: "#356CDD",
    secondary_color: "#F2C94C"
  },
  {
    id: "general",
    name: "General Psychology",
    level_background: generalMap,
    cover: generalCover,
    primary_color:"#9C7743",
    secondary_color:"#E9CFAA"
  },
]

const gameColors = {
  developmental: {
    background: ["#D0E796", "#7F9F30"],
    timer: ["#AFD02A", "#A1CA3D", "#AFD02A"],
    headerText: "#7F9F30",
    questionBackground: "#F2FFBE",
    answerBorder: {
      inner: "#E48238",
      outer: "#A15A24"
    }
  },
  abnormal: {
    background: ["#7A825B", "#1E2921"],
    timer: ["#8AFFC1", "#6ECC9A", "#539974"],
    headerText: "#8AFFC1",
    questionBackground: "#A1CDB6",
    answerBorder: {
      inner: "#3B3F2A",
      outer: "#248552"
    }
  },
  industrial: {
    background: ["#868686", "#2C2C2C"],
    timer: ["#FFA500", "#FFA500"],
    headerText: "#FFA500",
    questionBackground: "#FFFEEA",
    answerBorder: {
      inner: "#FFA500",
      outer: "#A7A9AC"
    }
  },
  psychological: {
    background: ["#98A4BD", "#356CDD"],
    timer: ["#F2C94C", "#F2C94C"],
    headerText: "#F2C94C",
    questionBackground: "#EAF3FF",
    answerBorder: {
      inner: "#356CDD",
      outer: "#F2C94C"
    }
  },
  general: {
    background: ["#F5F2EA",  "#9C7743"],
    timer: ["#9C7743", "#9C7743"],
    timerBackground: "#F5F2EA",
    headerText: "#9C7743",
    questionBackground: "#FFE4BE",
    answerBorder: {
      inner: "#F5F2EA",
      outer: "#E9CFAA"
    }
  }
}

const numberOfItems = {
  abnormal: {
    1: { items: 8, timer: 20 },
    2: { items: 7, timer: 20 },
    3: { items: 8, timer: 30 },
    4: { items: 7, timer: 30 },
    5: { items: 20, timer: 40 },
    6: { items: 20, timer: 40 },
    7: { items: 8, timer: 50 },
    8: { items: 7, timer: 50 },
    9: { items: 8, timer: 60 },
    10: { items: 7, timer: 60 },
  },
  developmental: {
    1: { items: 7 },
    2: { items: 8 },
    3: { items: 7 },
    4: { items: 8 },
    5: { items: 20 },
    6: { items: 20 },
    7: { items: 10 },
    8: { items: 10 },
    9: { items: 5 },
    10: { items: 5 },
  },
  psychological: {
    1: { items: 10 },
    2: { items: 9 },
    3: { items: 10 },
    4: { items: 10 },
    5: { items: 26 },
    6: { items: 26 },
    7: { items: 10 },
    8: { items: 9 },
    9: { items: 10 },
    10: { items: 10 },
  },
  industrial: {
    1: { items: 5 },
    2: { items: 4 },
    3: { items: 11 },
    4: { items: 10 },
    5: { items: 20 },
    6: { items: 20 },
    7: { items: 11 },
    8: { items: 11 },
    9: { items: 4 },
    10: { items: 4 },
  },
  general: {
    1: { items: 10 },
    2: { items: 10 },
    3: { items: 10 },
    4: { items: 10 },
    5: { items: 10 },
    6: { items: 10 },
    7: { items: 10 },
    8: { items: 10 },
    9: { items: 10 },
    10: { items: 10 },
  },
};

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

const badges = [
  { id: "ap1", category: "abnormal", level: 1, icon: ap1 },
  { id: "ap2", category: "abnormal", level: 2, icon: ap2 },
  { id: "ap3", category: "abnormal", level: 3, icon: ap3 },
  { id: "ap4", category: "abnormal", level: 4, icon: ap4 },
  { id: "ap5", category: "abnormal", level: 5, icon: ap5 },
  { id: "ap6", category: "abnormal", level: 6, icon: ap6 },
  { id: "ap7", category: "abnormal", level: 7, icon: ap7 },
  { id: "ap8", category: "abnormal", level: 8, icon: ap8 },
  { id: "ap9", category: "abnormal", level: 9, icon: ap9 },
  { id: "ap10", category: "abnormal", level: 10, icon: ap10 },
]

const API_URL = process.env.EXPO_PUBLIC_URL;
const _primary_color = "#2C519F"
const _secondary_color = "#FFD41C"

export { API_URL, avatars, categoriesObj, gameColors, navbarRoutes, branches, _primary_color, _secondary_color, clothes, numberOfItems, VERSION };