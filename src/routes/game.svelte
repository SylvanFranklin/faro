<script lang="ts">
  import {
    // type Card,
    type RussianFigure,
    get_other_players,
    player_to_color,
    Cards,
    place_bet,
    sleep,
  } from "$lib";
  import Keypad from "./keypad.svelte";
  import Token from "./token.svelte";
  // import Keypad from "./keypad.svelte";

  export let player: RussianFigure = {
    name: "Lermontov",
    title: "Hero of Our Time",
    wealth: 1500,
    href: "lermontov.jpeg",
    relative_wealth: 2,
  };

  const players = [player, ...get_other_players(player)];
  let game_state = {
    keypad_open: false,
    active_player: 0,
    current_bet_amount: 0,
    current_bet_location: -1,
  };
  let cards = structuredClone(Cards);

  function reset_state() {
    game_state.current_bet_amount = 0;
    game_state.current_bet_location = -1;
  }

  function bet() {
    cards = place_bet(
      {
        owner: game_state.active_player,
        amount: game_state.current_bet_amount,
        card_number: game_state.current_bet_location,
      },
      cards
    );
  }

  function PlayerBet(card: number) {
    game_state.current_bet_location = card;
    game_state.keypad_open = true;
  }

  $: if (game_state.current_bet_amount > 0 && game_state.active_player == 0) {
    bet();
    reset_state();
    OtherBets();
  }

  async function OtherBets() {
    for (let i = 1; i < 4; i++) {
      await sleep(400).then(() => {
        reset_state();
        game_state.active_player = i;
        const amount = Math.floor(Math.random() * 100);
        game_state.current_bet_location = Math.floor(
          Math.random() * cards.length
        );
        game_state.current_bet_amount = amount;
        console.log(i, game_state.current_bet_location);
        bet();
      });
    }
  }

  const setter = (a: number) => {
    game_state.keypad_open = false;
    game_state.current_bet_amount = a;
  };
</script>

<main class="w-3/4 mx-auto flex-col">
  {#if game_state.keypad_open}
    <Keypad {setter} character={player} />
  {/if}
  <section
    class="flex flex-row items-center justify-center border-8 border-slate-200 rounded-lg mt-8 bg-slate-600 shadow-lg overflow-clip"
  >
    <div class="grid grid-cols-7 grid-rows-2">
      {#each cards as card, i}
        <div class={`w-min h-min flex items-center justify-center`}>
          <button on:click={() => PlayerBet(i)} class="">
            <svg
              width="169.075"
              height="244.640"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="scale-[.60] p-0 -m-8 hover:scale-[.62] duration-10"
            >
              <use
                href={`node_modules/svg-cards/svg-cards.svg#diamond_${card.value}`}
              />
            </svg>
          </button>
          {#each card.bets as bet}
            {#if bet.amount > 0}
              <div class="absolute">
                <Token {bet} />
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </section>
  <div class="grid grid-flow-row grid-cols-6 gap-2 mt-4">
    {#each players as player, i}
      <div class="flex flex-col items-center">
        <div class="flex rounded-t-3xl overflow-clip w-30 h-full">
          <img src={player.href} alt="failed to fetch" />
        </div>
        <section
          class={`text-white ${player_to_color(
            i
          )} rounded-b-md p-3 shadow-md -mt-10 z-20 inset-0 text-sm w-full`}
        >
          {player.wealth}₽
        </section>
      </div>
    {/each}
    <!-- <div class="bg-gray-400 col-span-2"> -->
    <!-- hello -->
    <!--  -->
    <!-- </div> -->
  </div>
</main>
