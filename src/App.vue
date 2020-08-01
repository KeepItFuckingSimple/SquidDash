<template>
  <div id="app">
    <router-view v-on:addTile="addTile"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      content: {
        "tiles": []
      }
    }
  },
  methods: {
    addTile(data){
      this.content.tiles.push(data)

    }
  } 
}
</script>