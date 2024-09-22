import { pokedex } from "../../public/assets/pokemons.json";
import btnPokemonComponent from "../components/btnPokemon";
import cardPokemonComponent from "../components/cardPokemon";
import { typeDataPlayer } from "../interfaces/types";
import Storage from "./Storage";

export default class PagePlayer {
  private cards: NodeListOf<Element>;
  private modal: Element | null;
  private numberPokemons: number;
  private currentBtn: string | null;
  private isOnePlayer: boolean;

  constructor() {
    this.cards = document.querySelectorAll(".card-person");
    this.modal = document.querySelector(".modal-container .modal");
    this.numberPokemons = 6;
    this.currentBtn = null;
    this.isOnePlayer = location.pathname === "/player"; //Verifica pela url se será 1 ou 2 players

    if (this.modal && this.cards.length === 2) {
      this.init();
    }
  }

  private isJustOnePlayer() {
    //Valida e impede o resto das ações caso seja 2 players
    if (!this.isOnePlayer) return;

    //Inserir os dados do bot
    const image = this.cards[1].querySelector("img");

    if (image) {
      image.src = "assets/imgs/personagens/bot.png";
      const inputGender = image.nextElementSibling as HTMLDivElement;
      inputGender.setAttribute("style", "display:none");
    }

    const inputNameBot = this.cards[1].querySelector(
      "input#nome"
    ) as HTMLInputElement;

    if (inputNameBot) {
      inputNameBot.value = "Bot";
      inputNameBot.disabled = true;
    }

    //Remove o atributo 'data-btn-pokemon' para impedir adicionar eventos
    const card2ButtonBox = this.cards[1].querySelector("[buttons-box]");

    if (card2ButtonBox) {
      card2ButtonBox.querySelectorAll("[data-btn-pokemon]").forEach((btn) => {
        btn.removeAttribute("data-btn-pokemon");
        btn.classList.remove("hover:bg-slate-300", "hover:border-white");
      });
    }
  }

  private insertButtons = () => {
    const boxs = document.querySelectorAll("[buttons-box]");

    boxs.forEach((box, index) => {
      const rigthOrLeft = index == 0 ? "l" : "r";

      for (let i = 0; i < this.numberPokemons; i++) {
        box.insertAdjacentHTML(
          "beforeend",
          new btnPokemonComponent(`${rigthOrLeft}-${i}`).render()
        );
      }
    });
  };

  /* ===== Funções do Modal ===== */
  private clickOutside = (e: Event) => {
    if (e.currentTarget === e.target) {
      this.enableModal();
    }
  };

  private enableModal = () => {
    this.modal?.parentElement?.classList.toggle("hidden");
  };

  private handleBtnPokemonOptionClick = (e: Event) => {
    const el = e.currentTarget as HTMLButtonElement;
    this.currentBtn = el.id;
    this.enableModal();
  };

  private getButtons() {
    return [...document.querySelectorAll("div[data-btn-pokemon]")];
  }

  private addEventsAtButtons() {
    const btns = this.getButtons();

    btns.forEach((btn) =>
      btn.addEventListener("click", this.handleBtnPokemonOptionClick)
    );

    this.modal?.parentElement?.addEventListener("click", this.clickOutside);
    this.modal
      ?.querySelector("[x-close]")
      ?.addEventListener("click", this.clickOutside);

    document
      .querySelector("[btn-next]")
      ?.addEventListener("click", this.saveDataPlayers);
  }

  private insertPokemons = () => {
    const content = this.modal?.querySelector("#content-modal");

    if (!content) return;

    const sortPokedex = pokedex.sort((a, b) => (a.name < b.name ? -1 : 1));

    sortPokedex.forEach((pokemon) => {
      content.insertAdjacentHTML(
        "beforeend",
        new cardPokemonComponent(pokemon.name).render()
      );
    });

    const cardsPokemon = content.querySelectorAll(".card-pokemon");

    cardsPokemon.forEach((card) => {
      card
        .querySelector(".card-info button")
        ?.addEventListener("click", ({ currentTarget }) => {
          const p = document.querySelector(
            `#${this.currentBtn} p`
          ) as HTMLParagraphElement;

          const img = document.querySelector(
            `#${this.currentBtn} img`
          ) as HTMLImageElement;

          const btn = currentTarget as HTMLButtonElement;

          const namePokemon: string = btn.getAttribute(
            "name-pokemon"
          ) as string;

          if (this.currentBtn && namePokemon) {
            p.textContent = namePokemon;
            img.src = `/assets/imgs/pokemons/${namePokemon}.png`;
            this.enableModal();
          }
        });
    });
  };

  /* ===== Salvando e Validando Dados dos Jogadores ===== */
  private getDataUser = (i: number) => {
    //Get Name of Player
    const name =
      this.cards[i].querySelector<HTMLInputElement>("input#nome")!.value;

    //Get Pokemons Names
    const pElements = [
      ...this.cards[i].querySelectorAll("[buttons-box] [data-btn-pokemon] p"),
    ] as HTMLParagraphElement[];

    const pokemonsNames = pElements
      .map((p) => (p.textContent !== "?????" ? p.textContent : null))
      .filter((name) => name !== null);

    return {
      name: name,
      pokemonsNames: pokemonsNames,
    };
  };

  private validMissInformation = (dt: {
    name: string;
    pokemonsNames: string[];
  }) => {
    if (dt.name === "") {
      return { ok: false, msg: "Preencha o nome" };
    }

    if (dt.pokemonsNames.length !== 6) {
      return { ok: false, msg: "Escolha os 6 pokemons" };
    }

    return { ok: true, msg: "Ok" };
  };

  private savePlayer = (i: 0 | 1, name: string) => {
    const dataPlayerOne = this.getDataUser(i);

    const dataIsOk = this.validMissInformation(dataPlayerOne as typeDataPlayer);

    if (dataIsOk.ok) {
      Storage.saveContent(name, dataPlayerOne);
    } else {
      alert(dataIsOk.msg);
    }
  };

  returnRandomPokemonName = (maxValue: number): string => {
    const id = Math.floor(Math.random() * maxValue);

    return pokedex[id].name;
  };

  private saveDataPlayers = () => {
    //armengue
    Storage.deleteContent('data-player-one')
    Storage.deleteContent('data-player-two')

    this.savePlayer(0, "data-player-one");

    if (this.isOnePlayer) {
      //é bot
      const bot = {
        name: "bot",
        pokemonsNames: [] as string[],
      };

      for (let i = 0; i < this.numberPokemons; i++) {
        bot.pokemonsNames.push(this.returnRandomPokemonName(pokedex.length));
      }

      Storage.saveContent("data-player-two", bot); //input sexo nos cards estão iguais
    } else {
      this.savePlayer(1, "data-player-two"); //não é bot
    }

    if(Storage.getContent('data-player-one') && Storage.getContent('data-player-two')){
      location.href = '/arena'
    }
  };

  init() {
    this.insertButtons();
    this.insertPokemons();
    this.isJustOnePlayer();
    this.addEventsAtButtons();
  }
}
