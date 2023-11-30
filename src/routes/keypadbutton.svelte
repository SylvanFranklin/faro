<script lang="ts">
  export let action: Function;
  export let text: String
</script>

<button on:click={()=>action()}>
  {text}

</button>
