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
    },
    type: {
        type: String
    }
});

console.log('list',props.list)
const selected = ref([]);

const emit = defineEmits(['output-data']);

const getSelected = () => {
    emit('output-data', selected.value);
}

watchEffect(() => { if(props.reset) props.type === 'radio' ? selected.value = '' : selected.value.length = 0 });

const text = (elem) => props.list[0].surname ? `${elem.surname} ${elem.name}` : elem

</script>


<template>
    <!-- TEMPLATE -->
    <div :class="[ 'athleteList', { 'red': error } ]">
        <p>List of {{ `${props.type === 'checkbox' ? 'Athletes' : 'Categories'} : ${props.list.length}` }}</p>

        <span v-if="enableCheck && props.type === 'checkbox'" :class="{ 'red': error  }">Selected: {{ selected.length }}</span>
        <span v-if="enableCheck && props.type === 'radio'" class="red sel">Selected: {{ selected }}</span>

        <div class="col-12 catContainer" v-for="item in props.list" :key="item.username || item">
            <div class="form-check form-switch">

                <input v-if="enableCheck && props.type === 'checkbox'" v-model="selected" class="form-check-input" type="checkbox" role="switch" :id="item.username" :value="item" @change="getSelected">
                <input v-if="enableCheck && props.type === 'radio'" v-model="selected" class="form-check-input redCheck red" type="radio" role="switch" :id="item.username" :value="item" @change="getSelected">

                <label class="form-check-label" :for="item.username">{{ text(item) }}</label>

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

.form-check-input {
    position: absolute;
    right: 1.5em;
    top: .6em;
}

.athleteList p {
    text-align: center;
    margin-top: -1.9em;
    width: 10em;
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

.redCheck:checked {
    background-color: red;
}

.red {
    color: red !important;
    border: 1px solid red !important;
    border-radius: 1em;
}

.sel{
    width: 11em !important;
}

@media only screen and (max-width: 768px) {

    .col-form-label {
        text-align: center;
    }
}
</style>