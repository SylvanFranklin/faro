<script lang="ts">
  import type { RussianFigure } from "$lib";
  import CharacterSelect from "./character_select.svelte";
  import Game from "./game.svelte";
  import Menu from "./menu.svelte";

  let currentStage = 1;
  const stage_progression = ["welcome", "character select", "play"];

  const next_stage = () => {
    currentStage++;
  };

  let selected: RussianFigure;

  const send_selected = (fig: RussianFigure) => {
    selected = fig;
    currentStage++;
  };

  const home = () => {
    currentStage = 0;
  };

  const back = () => {
    currentStage--;
  };
</script>

<div class="w-screen h-max">
  {#if currentStage != 0}
    <button
      on:click={() => home()}
      class="ml-10 p-3 bg-red-400 rounded-md shadow-md text-white font-bold hover:scale-95 duration-100"
    >
      home
    </button>
  {/if}

  {#if currentStage == 0}
    <Menu dismiss_menu={next_stage} />
  {:else if currentStage == 1}
    <CharacterSelect {send_selected} />
  {:else if currentStage == 2}
    <Game player={selected} />
  {/if}
</div>
