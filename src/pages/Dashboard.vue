<template>
  <div id="dashboard">
    <sidebar v-bind:class="{ invisible: !showSide, visible: showSide }"></sidebar>
    <demo-component></demo-component>
    <div class="sidebar_controller">
  <ion-icon name="list-outline" @click="showSide = true"></ion-icon>
</div>
    <div class="compo" v-for="tile in this.content.tiles" v-bind:key="tile.name">
        <component :is="tiles[tile.type]" :data="tile.data"/><br>

    </div>
    <br>
    <button v-on:click=addComponent()>+ Add tile</button>
    <br><br><br><br>
    <button @click=goSettings>Settings</button>
    <bottombar @add_tile="addComponent()"></bottombar>


  </div>
</template>

<script>
import {tiles} from "../tiles/tiles.js"
import DemoComponent from "./components/demo.vue"
import Bottombar from "./components/bottom_bar.vue"
import Sidebar from "./components/left_bar.vue"
export default {
  name: 'Dashboard',
  data (){
    return {
      tiles:tiles,
      content: this.$parent.content,
      showSide: true,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    }
  },
  watch: {
    // whenever question changes, this function will run
    windowWidth: function (newWidth) {
      this.chooseForSidebar(newWidth)
    }
  },
  methods: {
    addComponent() {
        this.$router.push('add')


    },
    goSettings(){
      this.$router.push("settings")
    },
    handleResize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    },
    chooseForSidebar(width){
      if (width < 900){
        this.showSide = false
      }else{
        this.showSide = true
      }

    }
  },
  components: {
    DemoComponent,
    Bottombar,
    Sidebar
  },
  created(){
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.chooseForSidebar(this.windowWidth)
  },
  destroyed() {
      window.removeEventListener('resize', this.handleResize);
  }
}


</script>

<style lang="scss">

.sidebar_controller{
  color: black;
  position: fixed;
  font-size: 3rem;
  top: 0;
  margin-top: 15px;
  margin-left: 15px;
}
.sidebar_controller:hover{
  transform: scale(1.1);
}

#dashboard {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
