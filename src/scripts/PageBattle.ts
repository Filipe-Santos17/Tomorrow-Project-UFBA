import Storage from "./Storage";
import { typeDataPlayer, typePokemon } from "../interfaces/types";
import { pokedex } from "../../public/assets/pokemons.json";
import Pokemon from "../classes/Pokemon";
import Player from "../classes/Player";
import Ataque from "../classes/Ataque";
import Batalha from "../classes/Batalha";
import { optionsPlayers } from "../interfaces/types";

export default class PageBattle {
  PlayerOne: Player;
  PlayerTwo: Player;
  boxCurrentPokemon: NodeListOf<HTMLElement>;
  optionsPk: NodeListOf<HTMLElement>;
  pokemonsAvailable: [Pokemon[], Pokemon[]];
  battle: Batalha;

  constructor() {
    //Players
    const dtPlOne = Storage.getContentObj("data-player-one");
    const dtPlTwo = Storage.getContentObj("data-player-two");

    const dtArnNm = Storage.getContent("data-arena");

    if (!dtPlOne || !dtPlTwo || !dtArnNm) {
      this.redirectForPagePlayerMissData();
    }

    this.PlayerOne = this.makeThePlayer(dtPlOne);
    this.PlayerTwo = this.makeThePlayer(dtPlTwo);

    //Pokemons
    this.pokemonsAvailable = [
      this.PlayerOne.getPokemons(),
      this.PlayerTwo.getPokemons(),
    ];

    //Arena
    this.putBgSelected(dtArnNm);

    //Batalha
    this.battle = new Batalha(this.PlayerOne, this.PlayerTwo);

    //Page Battle
    this.boxCurrentPokemon = document.querySelectorAll("#current-pokemon")!;
    this.optionsPk = document.querySelectorAll("[list-pk]");

    this.init();
  }

  // Player
  private getPokemonsByName = (dataUser: typeDataPlayer) => {
    return dataUser.pokemonsNames.map(
      (name) => pokedex.filter((pk) => pk.name === name)[0]
    );
  };

  private makeThePlayer = (data: typeDataPlayer) => {
    const pokeData = this.getPokemonsByName(data);
    const pokemons = pokeData.map((pk) => this.makeThePokemon(pk));

    return new Player({
      name: data.name,
      pokemons,
    });
  };

  //Pokemon
  private makeThePokemon = (pk: typePokemon) => {
    return new Pokemon(pk);
  };

  //Arena
  private putBgSelected(bgPath: string | null) {
    if (!bgPath) return;
    const bgSection = document.querySelector("[change-bg]");
    bgSection?.setAttribute("style", bgPath.replaceAll('"', ""));
  }

  //Volta pra Home
  private redirectForPagePlayerMissData = () => {
    alert("Erro, Dados do usuário não foram encontrados");
    location.pathname = "/";
  };

  //Page Battle
  private insertPokemonsOptions = () => {
    //Preciso de uma logica pra não tornar visivel os pokemons do Bot
    this.optionsPk.forEach((opt, i) => {
      this.pokemonsAvailable[i].forEach((pok, j) => {
        opt.insertAdjacentHTML(
          "beforeend",
          /*html*/ `<button class="cursor-pointer" title="${pok.getNamePokemon()}" pk-name="${j}">
            <img src="/assets/imgs/icon-pokeball.webp" class="w-12 h-12"/>
          </button>
          `
        );
      });
    });
  };

  private changePokemonHandleClickButton = () => {
    const handlePokemon = (e: Event, i: optionsPlayers) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const idPokemon = +btn.getAttribute("pk-name")!;

      if (isNaN(idPokemon)) return;

      const pk = this.pokemonsAvailable[i][idPokemon];

      this.changePokemonInUserAndPage(idPokemon, pk, i);
    };

    this.optionsPk.forEach((opt, i) => {
      opt
        .querySelectorAll("[pk-name]")
        .forEach((btn) =>
          btn.addEventListener("click", (e) =>
            handlePokemon(e, i as optionsPlayers)
          )
        );
    });
  };

  private changePokemonInUserAndPage = (
    id: number,
    pk: Pokemon,
    i: optionsPlayers
  ) => {
    this.battle.getPlayer(i).changePokemonSelected(id);
    this.insertPokemonInPage(pk, i);
  };

  private setLifePkInPage = (numPosition: optionsPlayers, damage: number) => {
    const newLife = this.battle.applyDamage(numPosition, damage);

    const divLifePk =
      this.boxCurrentPokemon[numPosition].querySelector("[life-pokemon]")!;
    divLifePk.setAttribute("style", `width: ${newLife! < 0 ? 0 : newLife}%`);
  };

  private insertPokemonInPage = (currentPk: Pokemon, pos: optionsPlayers) => {
    const btnAtck = (i: Ataque) => /*html*/ `
      <button class="w-[80%] h-10 text-center bg-white p-4 rounded flex justify-center items-center">${i.getNameAttack()}</button>
    `;

    interface helpElements {
      elements: [
        titlePk: HTMLParagraphElement,
        imagePk: HTMLImageElement,
        boxAtkPk: HTMLDivElement,
        divLifePk: HTMLDivElement
      ];
    }

    const [titlePk, imagePk, boxAtkPk, divLifePk] = [
      "name-pokemon",
      "img-pokemon",
      "atks-pokemon",
      "life-pokemon",
    ].map(
      (i) => this.boxCurrentPokemon[pos].querySelector(`[${i}]`)!
    ) as helpElements["elements"];

    //Alterando nome do Pokemon
    titlePk.textContent = currentPk.getNamePokemon();

    //Mudando imagens do Pokemon
    imagePk.src = `/assets/imgs/pokemons/${currentPk.getNamePokemon()}.png`;

    //Mudando percentual de vida do Pokemon
    const life = currentPk.getLifePokemon();
    divLifePk.setAttribute("style", `width: ${life! > 0 ? life : 0}%`);

    //Mudando ataques do Pokemon
    boxAtkPk.innerHTML = "";
    const ataques = currentPk.getAttacks() as Array<Ataque>;

    if (life! > 0) {
      ataques.map((i) => boxAtkPk.insertAdjacentHTML("beforeend", btnAtck(i)));

      //Adicionando eventos nos btns de ataques
      const btnsAttacks = boxAtkPk.querySelectorAll("button");
      btnsAttacks.forEach((btn, i) =>
        btn.addEventListener("click", (e) => {
          this.handlePokemonAttackChangeLife(e, pos, ataques[i]);
        })
      );
    }
  };

  //Ataque Pokemon
  private handlePokemonAttackChangeLife = (
    _: Event,
    pos: optionsPlayers,
    atack: Ataque
  ) => {
    const num = pos === 0 ? 1 : 0;
    const damage = atack.getValueAttack();

    this.setLifePkInPage(num, damage);

    console.log(`atual: ${num} antigo: ${pos}`);

    this.changeTime(num, pos);
  };

  private pokemonIsAlive = (i: number) => {
    return (
      0 <=
      this.battle
        .getPlayer(i ? 1 : 0)
        .getPokemonSelected()
        .getLifePokemon()!
    );
  };

  private changeTime = (
    playerOfTheMoment: optionsPlayers,
    oldPlayer: optionsPlayers
  ) => {
    const isAlive = this.pokemonIsAlive(playerOfTheMoment);

    this.boxCurrentPokemon.forEach((box, i) => {
      const boxAttacks = box.querySelector("[atks-pokemon]")!;

      if (isAlive) {
        boxAttacks.removeAttribute("style");

        if (i === oldPlayer) {
          return boxAttacks.setAttribute("style", "display: none");
        }
      }
    });

    if (!isAlive) {
      if(!this.battle.checkPokemonsAreAlive()){
        this.battle.announceVictoria(oldPlayer);
      };

      console.log("hora de trocar");
    }
  };

  //Bot
  private isSecondPlayerBot() {}

  init() {
    this.insertPokemonsOptions();
    this.changePokemonHandleClickButton();
    this.insertPokemonInPage(this.PlayerOne.getPokemonSelected(), 0);
    this.insertPokemonInPage(this.PlayerTwo.getPokemonSelected(), 1);
    this.changeTime(0, 1);

    this.isSecondPlayerBot();

    this.battle.firstMsg();
  }
}
