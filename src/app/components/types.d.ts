import {ReactNode} from 'react';

export type InputType = {
    placeholder : string;
    name : string;
    label : string;
    isRequired : boolean;
    optinalStyle? : string;
    type: "email" | "password" | "text"
};

export type ButtonType = {
  text: string;
  style?: string;
  backgroundColor: string;
  textColor: string;
  image?: string;
  imageSide?: "left" | "right";
  id?: string;
  isActive: boolean;
  hoverColor: string;
};
export type LinkType = {
  text : string;
  optinalStyle?:string;
  href : string;
}
export type BackgroundImageType = {
  width:number;
  height:number;
  source:string;
}
export type LayoutType = {
  backgroundImage : string;
  children :  ReactNode; 
}