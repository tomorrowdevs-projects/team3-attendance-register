<script setup>
import { defineProps, ref } from 'vue';
import adminProfile from './adminSubPage/adminProfile.vue';
import adminPeopleList from './adminSubPage/adminPeopleList.vue';
import adminCategories from './adminSubPage/adminCategories.vue';
import adminCalendar from './adminSubPage/adminCalendar.vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const selected = ref('');
const showBack = ref(false);

</script>

<template>
    <img v-show="showBack" class="back" src="@/components/icons/back.png" alt="back" @click="[selected, showBack] = ['', false]">

    <div v-if="selected === ''" class="d-grid gap-4 col-4 mx-auto butContainer">
        <button class="btn btn-outline-secondary" type="button" @click="[selected, showBack] = ['profile', true]"><img
                src="@/components/icons/adminProfile.png" alt="adminProfile"> {{ name.toLocaleUpperCase() }}'s Profile</button>

        <hr>

        <button class="btn btn-outline-secondary" type="button" @click="[selected, showBack] = ['trainers', true]"><img
                src="@/components/icons/trainer.png" alt="trainer">
            Trainers</button>

        <button class="btn btn-outline-secondary" type="button" @click="[selected, showBack] = ['athlete', true]"><img
                src="@/components/icons/athlete.png" alt="athlete">
            Athletes</button>

        <button class="btn btn-outline-secondary" type="button" @click="[selected, showBack] = ['category', true]"><img
                src="@/components/icons/category.png" alt="category">
            Categories</button>

        <button class="btn btn-outline-secondary" type="button" @click="[selected, showBack] = ['calendar', true]"><img
                src="@/components/icons/calendar.png" alt="calendar">
            Calendar</button>

    </div>

    <adminProfile v-if="selected === 'profile'"/>
    <adminPeopleList v-if="selected === 'trainers' || selected === 'athlete'" :type="selected"/>
    <adminCategories v-if="selected === 'category'"/>
    <adminCalendar v-if="selected === 'calendar'"/>

</template>

<style scope>
button {
    font-size: 1.5rem !important;
    font-weight: bolder !important;
    box-shadow: 0px 0px 16px 0px grey;
    transition: box-shadow .4s;
}

button:hover {
    box-shadow: none;
}

button img {
    width: 1.5em;
    float: left;
}

.back{
    width: 3em;
    cursor: pointer;
    transform: translate(15em);
}

@media only screen and (max-width: 768px) {

    h1{
        font-size: 1.5em !important;
    }

    .butContainer {
        width: 90%;
    }

    .back{
        align-self: flex-end;
        transform: none;
    }
}

</style>