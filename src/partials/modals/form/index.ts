import Handlebars from "handlebars";
import input from "../../../components/input/index";
import button from "../../../components/button/index";

import tpl from "./tpl.hbs?raw";
import "./style.scss";
import { InputProps } from "../../../@types/types";

const inputsList: InputProps[] = [
  {
    type: "text",
    name: "login",
    label: "Логин",
    value: "ivanivanov",
    error: "некорректный логин",
    required: true,
  },
  { type: "password", name: "password", label: "Пароль", value: "qazwsx" },
];

Handlebars.registerPartial("input", input);
Handlebars.registerPartial("button", button);


export default ({ props = { inputsList } }) => {
  return Handlebars.compile(tpl)(props);
};
