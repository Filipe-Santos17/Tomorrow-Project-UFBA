//Arenas
import ArenaScreen from "./screens/Arena";
import HomeScreen from "./screens/Home";
import PlayersScreen from "./screens/Players";
import BattleScreen from "./screens/Battle";

//Scripts
import PageArena from "./scripts/PageArena";
import PagePlayer from "./scripts/PagePlayer";
import PageBattle from "./scripts/PageBattle";

class IndexRouter {
  constructor() {
    this.init();
  }

  routes() {
    const pathname = location.pathname.replace(/\//g, "");
    let page: () => string;

    switch (pathname) {
      case "": {
        page = HomeScreen;
        break;
      }
      case "player":
      case "players": {
        page = PlayersScreen;
        break;
      }
      case "arena": {
        page = ArenaScreen;
        break;
      }
      case "batalha": {
        page = BattleScreen;
        break;
      }
      default: {
        page = () => "404";
      }
    }

    return {
      page: page(),
    };
  }

  init() {
    const app = document.querySelector("#app");

    if (app) {
      const { page } = this.routes();
      app.innerHTML = page;

      //Consertar depois
      if (location.pathname.replace("/", "") === "player" || location.pathname.replace("/", "") === "players") {
        new PagePlayer();
      }

      if (location.pathname.replace("/", "") === "arena") {
        new PageArena();
      }

      if (location.pathname.replace("/", "") === "batalha") {
        new PageBattle();
      }
    }
  }
}

new IndexRouter();
