import Player from "./Player";
import { optionsPlayers } from "../interfaces/types";

export default class Batalha {
  private playerOne: Player;
  private playerTwo: Player;
  players: Player[];

  constructor(plOne: Player, plTwo: Player) {
    this.playerOne = plOne;
    this.playerTwo = plTwo;
    this.players = [this.playerOne, this.playerTwo];
  }

  announceVictoria(i: optionsPlayers) {
    this.sendMessage(`O jogador ${i}, ${this.players[i].getName()} venceu;`);
  }

  checkPokemonsAreAlive() {
    const lifesStatus = this.getPlayer(1)
      .getPokemons()
      .map((pk) => {
        return pk.getLifePokemon()! > 0;
      });

    const areAlive = lifesStatus.filter((lf) => lf);

    return areAlive.length;
  }

  applyDamage(num: optionsPlayers, dmg: number) {
    const life = this.getPlayer(num).getPokemonSelected().getLifePokemon()!;

    if (life > 0) {
      this.getPlayer(num)
        .getPokemonSelected()
        .setLifePokemon(life - dmg);

      const newLife = this.getPlayer(num).getPokemonSelected().getLifePokemon();

      return newLife;
    }

    return 0;
  }

  getPlayer = (i: optionsPlayers) => {
    return this.players[i];
  };

  sendMessage = (msg: string) => {
    alert(msg);
  };

  firstMsg = () => {
    this.sendMessage(
      "Está começando agora mais uma batalha no estádio pokemon entre 2 grandes competidores!"
    );
    this.sendMessage(
      "Desse lado está o nosso desafiante " + this.playerOne.talkAboutYourself()
    );
    this.sendMessage(
      "Desse lado está o nosso desafiado " + this.playerTwo.talkAboutYourself()
    );
  };
}
