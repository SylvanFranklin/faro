<script lang="ts">
  import { player_to_color, type Bet } from "$lib";
  export let bets: Bet[];

  const bets_length = bets.filter((bet) => bet.amount > 0).length;
</script>

<span class="absolute flex items-center justify-center">
  <ul
    class={`grid  gap-0 ${
      bets_length > 1 && "grid-rows-2 grid-cols-2 scale-[.75]"
    }`}
  >
    {#each bets as bet}
      {#if bet.amount > 0}
        <div
          class={`z-30 ${player_to_color(
            bet.owner
          )} text-sm rounded-lg text-white font-bold shadow-md w-16 aspect-square grid items-center justify-center`}
        >
          {bet.amount}₽
        </div>
      {/if}
    {/each}
  </ul>
</span>
