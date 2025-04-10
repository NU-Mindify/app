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
    id: "abnormal",
    name: "Abnormal Psychology",
    level_background: Map1,
    cover: category1,
  },
  {
    id: "developmental",
    name: "Developmental Psychology",
    level_background: Map2,
    cover: map2,
  },
  {
    id: "psychological",
    name: "Psychological Assessment",
    level_background: Map4,
    cover: map4,
  },
  {
    id: "industrial",
    name: "Industrial Psychology",
    level_background: Map2,
    cover: map2,
  },
  {
    id: "general",
    name: "General Psychology",
    level_background: Map1,
    cover: category1,
  },
]


export { avatars, categoriesObj };