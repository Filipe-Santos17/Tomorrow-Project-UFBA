export type typeDataPlayer = {
  name: string;
  pokemonsNames: string[];
};

export type typeAttackPk = {
  name: string;
  damage: number;
  type: string;
};

export type typePokemon = {
  name: string;
  type: string;
  dmge: number;
  life?: number;
  dfns: number;
  speed: number;
  attacks: typeAttackPk[];
};

export type typePokedex = typePokemon[];

export type typeArena = {
  name: string;
  imgUrl: string;
};

type optionsPlayers = 0 | 1;
