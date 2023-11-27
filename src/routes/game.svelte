<script lang="ts">
  import {
    // type Card,
    type RussianFigure,
    get_other_players,
    player_to_color,
    Cards,
    place_bet,
  } from "$lib";
  import Keypad from "./keypad.svelte";
  // import Keypad from "./keypad.svelte";

  export let player: RussianFigure = {
    name: "Lermontov",
    title: "Hero of Our Time",
    wealth: 1500,
    href: "lermontov.jpeg",
    relative_wealth: 2,
  };

  const players = [player, ...get_other_players(player)];
  const game_state = {
    keypad_open: false,
    active_player: 0,
    current_bet_amount: 0,
    current_bet_location: 0,
  };
  let cards = structuredClone(Cards);

  function reset_state() {
    game_state.current_bet_amount = 0;
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

  $: if (game_state.current_bet_amount > 0) {
    console.log("test")
    bet();
    reset_state();
    game_state.active_player++;
  }

  $: if (game_state.active_player == 1) {
    OtherBets();
  }

  function OtherBets() {
    const amount = 20;
    game_state.current_bet_amount = amount;
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
    class="flex flex-row items-center justify-center border-8 border-slate-200 rounded-lg mt-8 bg-slate-600 shadow-lg"
  >
    <div class="grid grid-cols-6 grid-rows-2">
      {#each cards.slice(0, -1) as card, i}
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
              <div
                class={`z-30 ${player_to_color(
                  bet.owner
                )} relative inset-0 rounded-full text-white font-bold shadow-md w-10 aspect-square h-10 flex item-center justify-center -ml-20`}
              >
                {bet.amount}
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
    <!-- seven card -->
    <button>
      <svg
        width="169.075"
        height="244.640"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="scale-[.60] shadow-lg hover:scale-[.62] duration-100 -m-4"
      >
        <use
          href={`node_modules/svg-cards/svg-cards.svg#diamond_${
            cards[cards.length - 1]
          }`}
        />
      </svg>
    </button>
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
