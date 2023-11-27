<script lang="ts">

  export let dismiss_menu: Function;

  enum States {
    ABOUT,
    RULES,
    NONE,
  }

  let active_state = States.NONE;

  const cycle_state = (state: States) => {
    if (state == active_state) {
      active_state = States.NONE;
    } else {
      active_state = state;
    }
  };
</script>

<div class="flex flex-col gap-6 mt-8 items-center">
  <button
    on:click={() => dismiss_menu()}
    class="text-white text-xl font-bold bg-blue-500 py-3 px-24 rounded-lg shadow-md hover:scale-95 duration-100 w-1/3"
  >
    Play
  </button>
  <button
    class="py-2 px-12 border-4 rounded-lg border-black hover:scale-95 duration-100"
    on:click={() => cycle_state(States.RULES)}
  >
    rules
  </button>
  <button
    class="py-2 px-8 border-4 rounded-lg border-black hover:scale-95 duration-100"
    on:click={() => cycle_state(States.ABOUT)}
  >
    me
  </button>

  {#if active_state == States.RULES}
    <div class="flex flex-col mx-auto w-2/3 text-center">
      <h1 class="text-2xl font-bold">The Rules</h1>
      <p class="">
        Faro is a late 17th century French Gambling game. You can read all about
        its rich history
        <a
          href="https://en.wikipedia.org/wiki/Faro_(banking_game)"
          class="text-green-500"
        >
          here.
        </a> Gameplay envolves several playes and a banker. In my game you will play
        as one of the player at an automated table. Every turn you may place a bet
        on one of 13 cards. The dealers will draw two cards at random, one winning,
        and the other losing. If the dealers winning card matches the one that you
        bet on, the dealer must pay you money equal to your bet. If the dealers losing
        card matches the one that you bet on, then your whole bet goes to the dealer.
        In the rare event that the dealers winning and losing card are the same,
        you and the dealer split the bet.
      </p>
    </div>
  {:else if active_state == States.ABOUT}
    <div class="flex flex-col mx-auto w-1/3 text-center">
      <h1 class="text-2xl font-bold">I'm Sylvan</h1>
      <p class="">
        I make little games and other websites like this! Check me out on
        <a class="text-orange-400" href="https://github.com/sylvanfranklin">
          github
        </a>
      </p>
    </div>
  {/if}
</div>
