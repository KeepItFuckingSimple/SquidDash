<template>
  <div id="create">
    <h3 v-for="error in this.errors" v-bind:key="error" style="color: red;">
        {{ error }}
    </h3>
    <br>

    <h1>Add a tile</h1>

    <input type="text" v-model="tile_name" placeholder="Tile name">

  
    <br>

    <br>
    <!-- Component selector -->
    <select v-model="selected_tile" @change="selectedTileChange"> 
        <option value="0" disabled=true>--Please choose a tile type--</option>
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
              <option value="0" disabled=true>--Please choose an action--</option>
              <option v-for="action in get_tile_module_actions(tile_event)" v-bind:key="action" :value="action">{{ action }}</option>
          </select>
          
          <br><br>
          <!-- Module specified required input, like url for http request -->
          <div class="action_options" v-if="selected_tile_events_data[tile_event].selected_action != 0">
            <div class="input" :key="input" v-for="input in get_tile_module_action_inputs_list(tile_event)">
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
import * as dataparser from './utils/data_parsers/creation.js'
export default {
  name: 'Create',
  data (){
    return {
      tiles:tiles,
      tiles_inputs_errors: {},
      available_modules: get_all_modules(),
      content: {
        tiles: []
      },
      selected_tile: 0,
      selected_tile_events: [],
      selected_tile_events_data: {},
      tile_name: "",
      errors: []
    }
  },
  methods: {
    get_tile_module_actions: function(tile_event) {
      var event = dataparser.getEventData(this.selected_tile_events_data,tile_event)
      
      return Object.keys(dataparser.getEventModuleActions(event))

    },
    get_tile_module_actions_inputs: function(tile_event){
      var event = dataparser.getEventData(this.selected_tile_events_data,tile_event)

      return dataparser.getEventActionInputs(event)
    },
    get_tile_module_action_inputs_list: function(tile_event){

      
      var inputs = this.get_tile_module_actions_inputs(tile_event)
      console.log("Calculated actions")
      return Object.keys(inputs)
    },

    selectedModuleChange(tile_event){
      console.log("It change")
      var event = dataparser.getEventData(this.selected_tile_events_data,tile_event)

      this.selected_tile_events_data[tile_event].module_data = get_module_info(dataparser.getEventModule(event))
      this.$forceUpdate();  // FORCE UPDATE FOR V-IF BECAUSE THEY WHERE NOT UPDATING THEIRSELVES

    },
    verifData(){      
      this.errors = []
      if (this.tile_name.length == 0){
        this.errors.push("Name should not be blank")
      }
      if (this.selected_tile == 0){
        this.errors.push("You shoud choice a tile")
      }
      Object.keys(this.selected_tile_events_data).forEach((event_name) => {

        var event = dataparser.getEventData(this.selected_tile_events_data,event_name)

        if (event.selected_module == 0){
          this.errors.push("You should choice a module for "+event_name+" event.")
        }
        if ( event.selected_action == 0 && event.selected_module != 0 ){ //BECAUSE IF SELECTED_MODULE = 0 , USER CAN'T YET SELECT ACTION
          this.errors.push("You should select an action for "+event.selected_module+" module.")
        }

        var module_action_inputs = dataparser.getEventActionInputs(event)

        Object.keys(module_action_inputs).forEach((input_name) => {

          var input = module_action_inputs[input_name]

          if (input.required == undefined || input.required == false){
            return
          }
          else {
            if (dataparser.getEventActionInputData(event,input_name) == undefined){
              this.errors.push(input_name+" of "+event_name+" should not be blank")
            }
          }
        })

      })

    },
    addTile(){
      this.verifData();
      console.log(this.errors)
      if (this.errors.length >= 1){
        return
      }
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
      this.selected_tile_events = (this.tiles[this.selected_tile].events)

      this.selected_tile_events_data = {}

      this.selected_tile_events.forEach((item) => {
        
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
