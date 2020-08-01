<template>
  <div id="app">
    <h1>{{ text }} </h1>
    <div class="compo" v-for="tile in content.tiles" v-bind:key="tile.name">
        <component :is="tiles[tile.type]" :data="tile.data"/><br>

    </div>
    <button v-on:click=addComponent()>+</button>
  </div>
</template>

<script>
import Button from './components/Button'
export default {
  name: 'App',
  data (){
    return {
      text: "SquidDash",
      tiles:{
        'Button': Button

      },
      content: {
        tiles: [
            {
              type: "Button",
              data: {
                action: "http",
                action_data: {
                  method: "GET",
                  url:"https://montest.requestcatcher.com/Bouton1"
                },
                name: "Bouton1"
              }
            },
                        {
              type: "Button",
              data: {
                action: "http",
                action_data: {
                  method: "GET",
                  url:"https://montest.requestcatcher.com/Bouton2"
                },
                name: "Bouton2"
              }
            }
          ]
      }
    }
  },
  methods: {
    addComponent() {
      console.log("Add component")
      this.content.push("Button")
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
