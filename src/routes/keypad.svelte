<script lang="ts">
  import type { RussianFigure } from "$lib";

  export let setter: Function;
  export let character: RussianFigure;

  let bet = "";
  const keys = [0, 1, 3, 4, 5, 6, 7, 8, 9];

  const update = (a: String) => {
    switch (a) {
      case "0":
        if (bet.length > 0) {
          bet += a;
        }
        break;
      case ".":
        if (!bet.includes(".")) {
          bet += a;
        }
        break;
      default:
        bet += a;
        break;
    }
  };

  const validate_and_send = (a: String) => {
    setter(+a);
  };
</script>

<main
  class="fixed w-full h-full inset-0 z-40 bg-gray-400/60 flex flex-col items-center pt-40 overflow-hidden backdrop-blur-sm backdrop-filter"
>
  <h1 class="text-5xl font-mono font-extrabold">PLACE BET</h1>
  <div class="flex h-1/3 w-1/3 mx-auto items-center flex-col gap-2 my-auto">
    <div
      class="w-full bg-white rounded-lg h-16 text-4xl resize-none outline-none py-3 px-2 text-left overflow-x-scroll"
    >
      {bet}
    </div>

    <section class="w-full flex justify-center gap-2">
      <button
        on:click={() => validate_and_send("-1")}
        class="bg-red-500 text-white rounded-lg p-4 text-lg font-bold shadow-md w-full"
        >cancel</button
      >
      <button
        on:click={() => (bet = "")}
        class="bg-black text-white rounded-lg p-4 text-lg font-bold shadow-md w-full"
      >
        Clear
      </button>
    </section>

    <ol class="grid grid-cols-3 grid-row-3 gap-2 text-2xl w-full">
      {#each keys as key}
        <button
          on:click={() => update(key.toString())}
          class="text-white aspect-square h-16 bg-slate-500 shadow-lg rounded-md font-bold hover:scale-95 duration-200"
        >
          {key}
        </button>
      {/each}
      <button
        class="text-white p-4 bg-blue-500 shadow-lg rounded-md font-bold hover:scale-95 duration-200"
        on:click={() => update(".")}
      >
        .
      </button>
      <button
        on:click={() => validate_and_send(bet)}
        class="text-white px-10 py-7 bg-blue-500 shadow-lg rounded-md font-bold hover:scale-95 duration-200 col-span-2"
      >
        enter
      </button>
    </ol>
  </div>
</main>
