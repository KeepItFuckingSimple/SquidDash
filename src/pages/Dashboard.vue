<template>
  <div id="dashboard">

    <h1>Squid Dash </h1>
    <div class="compo" v-for="tile in this.content.tiles" v-bind:key="tile.name">
        <component :is="tiles[tile.type]" :data="tile.data"/><br>

    </div>
    <br>
    <button v-on:click=addComponent()>+ Add tile</button>
    <br><br><br><br>
    <button @click=goSettings>Settings</button>
  </div>
</template>

<script>
import {tiles} from "../components/components.js"
export default {
  name: 'Dashboard',
  data (){
    return {
      tiles:tiles,
      content: this.$parent.content
    }
  },
  methods: {
    addComponent() {
        this.$router.push('add')


    },
    goSettings(){
      this.$router.push("settings")
    }
  },
}

</script>

<style lang="scss">
#dashboard {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
