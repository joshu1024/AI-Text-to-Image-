import logo from "./logo.svg";
import logo2 from "./logo2.png";
import logo_icon from "./logo_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import sample_img_1b from "./sample_img_1b.png";
import sample_img_2b from "./sample_img_2b.png";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";
import profile_img_3 from "./profile_img_3.png";

export const assets = {
  logo,
  logo2,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1b,
  sample_img_2b,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  profile_img_3,
};

export const stepsData = [
  {
    title: "Imagine Your Scene",
    description:
      "Enter a sentence or paragraph describing the visual you want to bring to life.",
    icon: step_icon_1,
  },
  {
    title: "Let AI Create",
    description:
      "Our intelligent system instantly turns your text into a visually stunning, original image.",
    icon: step_icon_2,
  },
  {
    title: "Save or Share",
    description:
      "Download your artwork or share it with others right from our platform in moments.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Marcus Lee",
    role: "Content Creator",
    stars: 4,
    text: `This tool has streamlined my workflow for YouTube thumbnails. It's fast, reliable, and surprisingly accurate — a real game-changer.`,
  },
  {
    image: profile_img_2,
    name: "Liam Thompson",
    role: "Freelance Photographer",
    stars: 5,
    text: `bg.removal has made editing my portfolio shots so much easier. The precision and speed are unmatched — highly recommend it!`,
  },
  {
    image: profile_img_3,
    name: "Carlos Rivera",
    role: "App Developer",
    stars: 5,
    text: `I integrate bg.removal into my app's workflow for automated image editing. The API is robust and very easy to work with.`,
  },
];

export const plans = [
  {
    id: "Basic",
    price: 10,
    credits: 100,
    desc: "Best for personal use.",
  },
  {
    id: "Advanced",
    price: 50,
    credits: 500,
    desc: "Best for business use.",
  },
  {
    id: "Business",
    price: 250,
    credits: 5000,
    desc: "Best for enterprise use.",
  },
];
