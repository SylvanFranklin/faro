<script lang="ts">
  import { player_to_color, type Bet } from "$lib";

  export let bet: Bet;
</script>

<div
  class={`z-30 ${player_to_color(
    bet.owner
  )} text-sm relative inset-0 rounded-lg text-white font-bold shadow-md w-16  aspect-square grid items-center justify-center`}
>
  {bet.amount}₽
</div>
