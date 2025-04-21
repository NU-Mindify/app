import BlackOrangeGirl from "./assets/avatar/blackOrangeGirl.svg";
import BlueMan from "./assets/avatar/blueMan.svg";
import OrangeMan from "./assets/avatar/orangeMan.svg";
import RedGirl from "./assets/avatar/redGirl.svg";
import WhiteMan from "./assets/avatar/whiteMan.svg";
import WhiteOrangeGirl from "./assets/avatar/whiteOrangeGirl.svg";

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

const categoriesObj = [
  {
    id: "developmental",
    name: "Developmental Psychology",
    level_background: Map2,
    cover: map2,
    primary_color: "#99E143"
  },
  {
    id: "abnormal",
    name: "Abnormal Psychology",
    level_background: Map1,
    cover: category1,
    primary_color: "#3B3F2A"
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


export { avatars, categoriesObj };