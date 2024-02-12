import login from "./partials/modals/form";
import "./index.less";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");

  if (root) {
    root.innerHTML = login({});
  }
  // let inputs = document.querySelectorAll(".modal__input");
  // inputs.forEach((input) => {
  //   console.log(input.name, input.valie);
  // });
  // setInterval(()=>{
  //   console.log(document.querySelector("#login").value);
  // }, 2000)
});
