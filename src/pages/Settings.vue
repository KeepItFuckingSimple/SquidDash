<template>
    <div class="settings">
        <button @click="importJson">Import data</button>

        <br><br>

        <button @click="exported = true" >Export data</button>

        <br>
        <br>
        <br>
        <br>
        <br>

        <json-viewer v-if="exported"
  :value="content"
   theme="my-awesome-json-theme"
  copyable
  expanded="true"
  ></json-viewer>
    </div>
</template>
<script>
import ls from 'local-storage'
import JsonViewer from 'vue-json-viewer'
import Swal from 'sweetalert2'

function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        console.log(e)
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}

export default {
    name: "Settings",
    data (){
        return {
            content: ls("content"),
            exported: false
        }
    },
    components: {
        JsonViewer
    },
    methods: {
        async importJson(){
            const { value: text } = await Swal.fire({
            title: 'Paste json here',
            input: 'textarea',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
            })

            if (text) {
            if(isJson(text)){
                ls.set("content",JSON.parse(text))
                this.$emit("updateContent")
                await Swal.fire({
                icon: 'success',
                title: 'Perfect',
                text: 'Data successfuly imported',
                })
                this.$router.push("/")
            }
            }
        }
    }
    
}
</script>

<style lang="scss">
.my-awesome-json-theme {
  background: #34495e;
  white-space: nowrap;
  color: #fff;
  font-size: 14px;
  border-radius: 15px;
  font-family: Consolas, Menlo, Courier, monospace;
 
  .jv-ellipsis {
    color: #fff;
    background-color: transparent;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button { color: #49b3ff }
  .jv-key { color: #fff }
  .jv-item {
    &.jv-array { color: #fff }
    &.jv-boolean { color: #fc1e70 }
    &.jv-function { color: #067bca }
    &.jv-number { color: #fc1e70 }
    &.jv-number-float { color: #fc1e70 }
    &.jv-number-integer { color: #fc1e70 }
    &.jv-object { color: #fff }
    &.jv-undefined { color: #e08331 }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
        color: #fff
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}

</style>