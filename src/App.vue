<template>
  <div id="app">
    <router-view @addTile="addTile" @updateContent="updateContent"/>
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
    this.updateContent()
  },
  methods: {
    addTile(data){
      this.content.tiles.push(data)
      storage.set("content",this.content)
    },
    updateContent(){
      var stored_content = storage.get("content");
      if (stored_content != null){
        this.content = stored_content
      }
      this.$mqtt.publish('testxxtest', 'message to Sub1')

    }
  } 
}
</script>