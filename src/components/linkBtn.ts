import IComponent from "../interfaces/InterfaceComponent";

type TypesLinkBtnComponent = {
  text: string;
  bgColor?: `#${string}`;
  link: string;
};

export default class LinkBtnComponent implements IComponent {
  private text: TypesLinkBtnComponent["text"];
  private bgColor: TypesLinkBtnComponent["bgColor"];
  private link: TypesLinkBtnComponent["link"];

  constructor({ text, bgColor = "#07e079", link }: TypesLinkBtnComponent) {
    this.text = text;
    this.bgColor = bgColor;
    this.link = link;
  }

  render = () => {
    const { bgColor, link, text } = this;
    return /*html*/ `
      <a class="inline-flex align-center justify-center p-3 rounded h-12 font-bold text-sm cursor-pointer" href="${link}" style="background-color: ${bgColor}">
        ${text}
      </a>
    `;
  };
}
