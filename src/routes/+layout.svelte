<script>
  import "../app.pcss";
</script>

<main
  class="w-screen h-screen font-mono flex flex-col items-center mt-12 space-y-6"
>
  <h1
    class="text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text flex flex-col text-center"
  >
    FARO ONLINE
    <sub class="text-black text-sm">
      With famous Russian writers and Characters!
    </sub>
  </h1>
  <slot />
</main>
