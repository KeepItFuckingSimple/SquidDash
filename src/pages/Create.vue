<template>
  <div id="create">

    <h1>Add a tile</h1>

    <input type="text" v-model="tile_name" placeholder="Tile name">

    <br><br>
    <!-- Component selector -->
    <select v-model="selected_tile" @change="selectedTileChange"> 
        <option value="0" disabled=true>--Please choose a component--</option>
        <option v-for="tile in tiles" v-bind:key="tile.name" :value="tile.name">{{ tile.name }}</option>
    </select>
    
    <br><br>

    <section v-for="tile_event in selected_tile_events" v-bind:key="tile_event" class="tile_event_config">
          <h1>Config for: {{tile_event}}</h1>
        <!-- Module selector ( http , mqtt , etc ) --> 
          <select v-if="selected_tile != 0" v-model="selected_tile_events_data[tile_event].selected_module" @change="selectedModuleChange(tile_event)">
              <option value="0" disabled=true>--Please choose a module--</option>
              <option v-for="module in available_modules" v-bind:key="module" :value="module">{{ module }}</option>
          </select>
          
          <br><br>
          

          <!-- Action of module , exemple get or post for http , etc , like a method -->
          <select v-if="selected_tile_events_data[tile_event].selected_module != 0" @click="$forceUpdate()" v-model="selected_tile_events_data[tile_event].selected_action">
              <option value="0" disabled=true>--Please choose an variant--</option>
              <option v-for="action in get_tile_module_actions(tile_event)" v-bind:key="action" :value="action">{{ action }}</option>
          </select>
          
          <br><br>
          <!-- Module specified required input, like url for http request -->
          <div class="action_options" v-if="selected_tile_events_data[tile_event].selected_action != 0">
            <div class="input" :key="input" v-for="input in get_tile_module_action_inputs(tile_event)">
                <input type="text" @input="$forceUpdate()" v-model="selected_tile_events_data[tile_event].action_data[input]"  :name="input" :id="input" :placeholder="input">
            </div>
          </div>
    </section>



    <button @click="addTile()">Create ! </button>


  </div>
</template>

<script>
import {tiles} from "../tiles/tiles.js"
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
      selected_tile_events: [],
      selected_tile_events_data: {},
      tile_name: ""
    }
  },
  methods: {
    get_tile_module_actions: function(tile_event) {
      return Object.keys(this.selected_tile_events_data[tile_event].module_data.actions)
    },
    get_tile_module_action_inputs: function(tile_event){

      
      var inputs = this.selected_tile_events_data[tile_event].module_data.actions[this.selected_tile_events_data[tile_event].selected_action].inputs
      console.log("Calculated actions")
      return Object.keys(inputs)
    },

    selectedModuleChange(action){
      console.log("It change")
      this.selected_tile_events_data[action].module_data = get_module_info(this.selected_tile_events_data[action].selected_module)
      this.$forceUpdate();  // FORCE UPDATE FOR V-IF BECAUSE THEY WHERE NOT UPDATING THEIRSELVES

    },
    addTile(){

      var tileContent = {
          type: this.selected_tile,
          data: {
            events: this.selected_tile_events_data,
            name: this.tile_name
          }
      }

      this.$emit('addTile', tileContent)
      this.$router.push('/')
    },
    selectedTileChange(){
      console.log("Tile changed")
      this.selected_tile_events = (this.tiles[this.selected_tile].events)
      this.selected_tile_events_data = {}
      console.log(this.selected_tile_events)
      this.selected_tile_events.forEach((item) => {
        console.log(item)
        this.selected_tile_events_data[item] = {selected_module: 0,action_data: {},selected_action: 0}

      })
    }
  }
}

</script>

<style lang="scss">
#create {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
