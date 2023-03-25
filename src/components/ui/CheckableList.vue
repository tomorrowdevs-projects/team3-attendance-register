<script setup>
//SCRIPT
import { ref, watchEffect } from 'vue';

const props = defineProps({
    list: {
        type: Array,
        required: true
    },
    enableCheck: {
        type: Boolean,
        default: false
    },
    error: {
        type: Boolean,
        default: false
    },
    reset: {
        type: Boolean,
        default: false
    }
});

const selected = ref([]);

const emit = defineEmits(['output-data']);

const getSelected = () => {
    emit('output-data', selected.value);
}

watchEffect(() => { if(props.reset) selected.value.length = 0 });

const text = (elem) => props.list[0].surname ? `${elem.surname} ${elem.name}` : elem

</script>


<template>
    <!-- TEMPLATE -->
    <div :class="[ 'athleteList', { 'red': error } ]">
        <p>List of Athletes: {{ props.list.length }}</p>

        <span v-if="enableCheck" :class="{ 'red': error }">Selected: {{ selected.length }}</span>

        <div class="col-12 catContainer" v-for="item in props.list" :key="item.username || item">
            <div class="form-check form-switch">

                <input v-if="enableCheck" v-model="selected" class="form-check-input" type="checkbox" role="switch" :id="item.username || item.replace(/\s/g, '')" :value="item" @change="getSelected">

                <label class="form-check-label" :for="item.username || item.replace(/\s/g, '')">{{ text(item) }}</label>

            </div>
        </div>
    </div>
</template>


<style scoped>
/* STYLE */

.athleteList {
    border: 1px solid gray;
    border-radius: 1em;
    padding: 1em;
    width: 100%;
}

.form-switch {
    box-shadow: 0 0 13px gray;
    border-radius: 1em;
    margin: 1em 0;
    padding: 5px 1em;
    text-align: center;
}

.form-switch label {
    font-size: 1.3em;
}

.form-check-input[type=checkbox] {
    position: absolute;
    right: 1.5em;
    top: .6em;
}

.athleteList p {
    text-align: center;
    margin-top: -1.9em;
    width: 135px;
    background-color: aliceblue;
}

.athleteList span {
    position: absolute;
    top: -13px;
    right: 15px;
    background-color: aliceblue;
    width: 90px;
    text-align: center;
    color: green;
    font-weight: 700;
}

.red {
    color: red !important;
    border: 1px solid red !important;
    border-radius: 1em;
}

@media only screen and (max-width: 768px) {

    .col-form-label {
        text-align: center;
    }
}
</style>