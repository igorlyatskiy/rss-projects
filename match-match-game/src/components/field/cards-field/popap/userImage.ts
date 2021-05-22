import { App } from './../../../../ts/app';
import { BaseComponent } from './../../../base-component';
import "./img/userDark.png";
import { app } from './../../../../ts/index'
export class UserImage {
  public input: HTMLInputElement;
  public img: HTMLImageElement;
  public app: App;
  constructor() {
    this.input = document.createElement("input");
    this.input.classList.add("popap__input_file");
    this.input.setAttribute("type", "file");
    this.input.setAttribute("title", "Choose a file");

    this.img = document.createElement("img");
    this.img.classList.add("popap__img");

    this.img.setAttribute("src", "./img/userDark.png");
    this.img.setAttribute("alt", "User image");

    this.loadImage(this.input, this.img);

    // this.addImage2Model();
  }

  loadImage = (fileInput: HTMLInputElement, img: HTMLImageElement) => {
    fileInput.addEventListener("change", (e) => {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
      fileInput.value = null; // обнуляет значение input, чтобы можно было загрузить картинку дважды подряд
      this.addImage2Model();
    });
  }

  addImage2Model = () => {
    this.app = app;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    this.img.addEventListener("load", () => {
      canvas.width=this.img.naturalWidth;
      canvas.height=this.img.naturalHeight;
      ctx.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight);
      const dataURL = canvas.toDataURL();
      this.app.Controller.Model.user.avatar = dataURL;
    })
  }

  covertDataUrl2Image = () => {

  }
}