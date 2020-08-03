<template>
    <div class="button">
        <button v-on:click="do_action(data.module,data.module_data)">{{ data.name }}</button>
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
        do_action(module,data){
            call_module(module,data)
        }
    },
    name: "Button"
}

</script>