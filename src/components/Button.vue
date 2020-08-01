<template>
    <div class="button">
        <button v-on:click="do_action(data.action,data.action_data)">{{ data.name }}</button>
    </div>
</template>

<script>
import { call_action } from '../actions.js';

export default {
    data (){
        return {
            text: 'Je suis un simple bouton',
            count: 0
        }
    },
    props: {
        data: {
            required: true
        }
    },
    methods: {
        do_action(action,data){
            call_action(action,data)
        }
    },
    name: "Button"
}
</script>