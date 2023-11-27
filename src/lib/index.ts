export interface RussianFigure {
  name: string;
  title: string;
  href: string;
  wealth: number; // Amount in rubles
  relative_wealth: number;
}

export const characters: RussianFigure[] = [
  {
    name: "Nikolai Gogol",
    title: "Mad Comic Genius",
    wealth: 10000,
    href: "gogol.jpeg",
    relative_wealth: 5,
  },
  {
    name: "Alexander Puskin",
    title: "Beloved Author",
    wealth: 600,
    href: "Pushkin.jpeg",
    relative_wealth: 4,
  },
  {
    name: "Dostoevsky",
    title: "filler text",
    wealth: 1500,
    href: "dostoevsky.jpg",
    relative_wealth: 2,
  },
  {
    name: "Lermontov",
    title: "Hero of Our Time",
    wealth: 1500,
    href: "lermontov.jpeg",
    relative_wealth: 2,
  },
];

type Suit = "spades" | "hearts" | "clubs" | "diamonds";

export type Card =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "9"
  | "10"
  | "jack"
  | "queen"
  | "king"
  | "7";

export type SuitCard = `${Suit}_${Card}`;

export const suits = ["spades", "hearts", "clubs", "diamonds"];

export const card_vals: Card[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "7",
];

export function get_other_players(player: RussianFigure, num = 3) {
  let players: RussianFigure[] = [];

  for (let i = 0; i < num; i++) {
    let current = characters[Math.floor(Math.random() * characters.length)];

    while (current == player || players.some((plr) => plr == current)) {
      current = characters[Math.floor(Math.random() * characters.length)];
    }

    players.push(current);
  }
  return players;
}

export interface Bet {
  amount: number;
  owner: number;
  card_number: number;
}

export interface GameCard {
  value: Card;
  bets: Bet[];
}

export const Cards: GameCard[] = card_vals.map((val, i) => {
  return {
    value: val,
    bets: [
      { owner: 0, amount: 0, card_number: i },
      { owner: 1, amount: 0, card_number: i },
      { owner: 2, amount: 0, card_number: i },
      { owner: 3, amount: 0, card_number: i },
    ],
  };
});

export const place_bet = (bet: Bet, game_cards: GameCard[]): GameCard[] => {
  const clone = structuredClone(game_cards);
  clone[bet.card_number].bets[bet.owner].amount = bet.amount;
  return clone;
};

export function player_to_color(player: number) {
  switch (player) {
    case 1:
      return "bg-black";
    case 2:
      return "bg-orange-400";
    case 3:
      return "bg-blue-500";
    default:
      return "bg-green-600";
  }
}
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
