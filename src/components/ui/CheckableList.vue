<script setup>
//SCRIPT
const props = defineProps({
    list: {
        type: Object,
        required: true
    }
});

const emits = defineEmits(['output-data']);

</script>


<template>
    <!-- TEMPLATE -->
    <div :class="'athleteList ' + props.list.red">
        <p>List of Athletes: {{ props.list.listItemArr.length }}</p>
        <span :class="red">Selected: 1</span>
        <div class="col-12 catContainer" v-for="athlete in props.list.listItemArr" :key="athlete.username">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch"
                    :id="athlete.username" :value="athlete">
                <label class="form-check-label" :for="athlete.username">{{ `${athlete.surname} ${athlete.name}`
                }}</label>
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
}

@media only screen and (max-width: 768px) {

    form {
        width: 100%;
    }

    .col-form-label {
        text-align: center;
    }
}
</style>