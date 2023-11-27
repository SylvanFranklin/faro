<script lang="ts">
  import { characters } from "$lib";
  import Portrait from "./portrait.svelte";
  export let send_selected: Function;
</script>

<main class="flex flex-col text-center">
  <h1 class="text-black text-4xl font-bold mt-8">Choose your Gambler</h1>

  <section
    class="grid grid-flow-row mt-20 justify-center grid-row-3 grid-cols-3 mx-auto gap-4"
  >
    {#each characters as character}
      <button
        class="w-60 h-60 border-4 border-black rounded-lg shadow-lg flex flex-col p-4 hover:rotate-3 duration-150"
        on:click={() => send_selected(character)}
      >
        <Portrait href={character.href} />
        <h1 class="text-center text-lg font-bold">
          {character.name}
        </h1>
        <p class="text-center text-xs">
          {character.title}
        </p>
      </button>
    {/each}
  </section>
</main>
