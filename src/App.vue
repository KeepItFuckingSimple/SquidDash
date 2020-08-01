<template>
  <div id="app">
    <router-view v-on:addTile="addTile"/>
  </div>
</template>

<script>
import storage from  'local-storage';
export default {
  data(){
    return {
      content: {
        "tiles": []
      }
    }
  },
  created() {
    var stored_content = storage.get("content");
    if (stored_content != null){
      this.content = stored_content
    }
  },
  methods: {
    addTile(data){
      this.content.tiles.push(data)
      storage.set("content",this.content)
    }
  } 
}
</script>