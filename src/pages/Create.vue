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
    <!-- Action selector ( http , mqtt , etc ) --> 
    <select v-if="selected_tile != 0" v-model="selected_action" @change="selectedActionChange()">
        <option value="0" disabled=true>--Please choose an action--</option>
        <option v-for="action in available_actions" v-bind:key="action" :value="action">{{ action }}</option>
    </select>
    
    <br><br>
    <!-- Variant of action , exemple get or post for http , etc , like a method -->
    <select v-if="selected_action != 0"  v-model="selected_variant">
        <option value="0" disabled=true>--Please choose an variant--</option>
        <option v-for="variant in variants" v-bind:key="variant" :value="variant">{{ variant }}</option>
    </select>
    
    <br><br>
    <!-- Action specify required input, like url for http request -->
    <div class="variant_options" v-if="selected_variant != 0">
      <div class="input" :key="input" v-for="input in variant_inputs">
          <input type="text"  v-model="variant_data[input]"  :name="input" :id="input" :placeholder="input">
      </div>
    </div>

    <button @click="addTile()" v-if="selected_variant != 0">Create ! </button>


  </div>
</template>

<script>
import {tiles} from "../components/components.js"
import {get_all_actions,get_action_info} from "../actions/actions.js"
export default {
  name: 'Create',
  data (){
    return {
      tiles:tiles,
      available_actions: get_all_actions(),
      content: {
        tiles: []
      },
      selected_tile: 0,
      selected_action: 0,
      selected_variant: 0,
      action_data: {},
      variant_data:{},
      tile_name: ""
    }
  },
  computed: {
    variants: function() {
      return Object.keys(this.action_data.variants)
    },
    variant_inputs: function(){
      var inputs = this.action_data.variants[this.selected_variant].inputs
      return Object.keys(inputs)
    }
  },
  methods: {
    selectedActionChange(){
      this.action_data = get_action_info(this.selected_action)
    },
    addTile(){

      var tileContent = {
          type: this.selected_tile,
          data: {
            action: this.selected_action,
            action_data: Object.assign({}, this.variant_data, this.action_data.variants[this.selected_variant].identifiers),
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
