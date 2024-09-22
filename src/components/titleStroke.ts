import IComponent from "../interfaces/InterfaceComponent";

export default class TitleStroke implements IComponent {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  render = () => {
    return /*html*/ `
      <h3 class="text-3-stroke text-5xl text-pokeColor">${this.text}</h3>
    `;
  };
}
