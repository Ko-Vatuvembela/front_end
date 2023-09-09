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