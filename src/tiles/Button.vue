<template>
    <div class="button">
        <button v-on:click="do_action('click')">{{ data.name }}</button>
    </div>
</template>

<script>
import { call_module } from '../modules/modules.js';

export default {
    props: {
        data: {
            required: true
        }
    },
    methods: {
        do_action(event){
            call_module(event,this.data)
        }
    },
    name: "Button",
    events: ["click"]
}

</script>