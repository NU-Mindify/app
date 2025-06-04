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

import abnormalMap from "./assets/maps/abnormalLong.png";
import developmentalMap from "./assets/maps/developmental.png";
import organizationalMap from "./assets/maps/organizational.png";
import Map1 from "./assets/maps/1.png";
import Map2 from "./assets/maps/2.png";
import Map4 from "./assets/maps/4.png";

import abnormalCover from "./assets/categories/abnormalCover.png";
import developmentalCover from "./assets/categories/developmentalCover.png";
import industrialCover from "./assets/categories/industrialCover.png";

import category1 from './assets/categories/1.jpg';
import map2 from './assets/maps/2.png'
import map4 from './assets/maps/4.png'

import corp1 from './assets/clothes/CORPORATE 1.svg'
import corp2 from './assets/clothes/CORPORATE 2.svg'
import corp3 from './assets/clothes/CORPORATE 3.svg'
import corp4 from './assets/clothes/CORPORATE 4.svg'
import corp5 from './assets/clothes/CORPORATE 5.svg'
import corp6 from './assets/clothes/CORPORATE 6.svg'
import fUnif from './assets/clothes/F UNIFORM.svg'
import mUnif from './assets/clothes/M UNIFORM.svg'


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

const navbarRoutes = ["Home", "Chatbot", "Glossary", "Mindmap", "Store"]

const categoriesObj = [
  {
    id: "abnormal",
    name: "Abnormal Psychology",
    level_background: abnormalMap,
    cover: abnormalCover,
    primary_color: "#3B3F2A",
    secondary_color: "#248552"
  },
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
    primary_color: "#6C6C6C"
  },
  {
    id: "psychological",
    name: "Psychological Assessment",
    level_background: Map4,
    cover: map4,
    primary_color: "#3C4F76"
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
const _primary_color = "#2C519F"
const _secondary_color = "#FFD41C"

export { API_URL, avatars, categoriesObj, gameColors, navbarRoutes, branches, _primary_color, _secondary_color, clothes };