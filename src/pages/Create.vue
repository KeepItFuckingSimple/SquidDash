<template>
  <div id="app">

    <h1>Add a tile</h1>

    <input type="text" v-model="tile_name" placeholder="Tile name">

    <br><br>
    <!-- Component selector -->
    <select v-model="selected_tile">
        <option value="0" disabled=true>--Please choose a component--</option>
        <option v-for="tile in tiles" v-bind:key="tile.name" :value="tile.name">{{ tile.name }}</option>
    </select>
    
    <br><br>
    <!-- Module selector ( http , mqtt , etc ) --> 
    <select v-if="selected_tile != 0" v-model="selected_module" @change="selectedModuleChange()">
        <option value="0" disabled=true>--Please choose a module--</option>
        <option v-for="module in available_modules" v-bind:key="module" :value="module">{{ module }}</option>
    </select>
    
    <br><br>
    <!-- Action of module , exemple get or post for http , etc , like a method -->
    <select v-if="selected_module != 0"  v-model="selected_action">
        <option value="0" disabled=true>--Please choose an variant--</option>
        <option v-for="action in actions" v-bind:key="action" :value="action">{{ action }}</option>
    </select>
    
    <br><br>
    <!-- Module specified required input, like url for http request -->
    <div class="action_options" v-if="selected_action != 0">
      <div class="input" :key="input" v-for="input in action_inputs">
          <input type="text"  v-model="action_data[input]"  :name="input" :id="input" :placeholder="input">
      </div>
    </div>

    <button @click="addTile()" v-if="selected_action != 0">Create ! </button>


  </div>
</template>

<script>
import {tiles} from "../components/components.js"
import {get_all_modules,get_module_info} from "../modules/modules.js"
export default {
  name: 'Create',
  data (){
    return {
      tiles:tiles,
      available_modules: get_all_modules(),
      content: {
        tiles: []
      },
      selected_tile: 0,
      selected_module: 0,
      selected_action: 0,
      module_data: {},
      action_data:{},
      tile_name: ""
    }
  },
  computed: {
    actions: function() {
      return Object.keys(this.module_data.actions)
    },
    action_inputs: function(){
      var inputs = this.module_data.actions[this.selected_action].inputs
      return Object.keys(inputs)
    }
  },
  methods: {
    selectedModuleChange(){
      this.module_data = get_module_info(this.selected_module)
    },
    addTile(){

      var tileContent = {
          type: this.selected_tile,
          data: {
            module: this.selected_module,
            module_data: Object.assign({}, this.action_data, this.module_data.actions[this.selected_action].identifiers),
            name: this.tile_name
          }
      }

      this.$emit('addTile', tileContent)
      this.$router.push('/')
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
