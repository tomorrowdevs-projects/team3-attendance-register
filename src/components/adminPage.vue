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
    }
});

const selected = ref('');

</script>

<template>
    <div v-if="selected === ''" class="d-grid gap-4 col-4 mx-auto">
        <button class="btn btn-outline-secondary" type="button" @click="selected = 'profile'"><img
                src="@/components/icons/adminProfile.png" alt="athlete"> {{ name.toLocaleUpperCase() }}'s Profile</button>

        <hr>

        <button class="btn btn-outline-secondary" type="button" @click="selected = 'trainers'"><img
                src="@/components/icons/trainer.png" alt="athlete">
            Trainers</button>

        <button class="btn btn-outline-secondary" type="button" @click="selected = 'athlete'"><img
                src="@/components/icons/athlete.png" alt="athlete">
            Athletes</button>

        <button class="btn btn-outline-secondary" type="button" @click="selected = 'category'"><img
                src="@/components/icons/category.png" alt="athlete">
            Categories</button>

        <button class="btn btn-outline-secondary" type="button" @click="selected = 'calendar'"><img
                src="@/components/icons/calendar.png" alt="athlete">
            Calendar</button>

    </div>

    <adminProfile v-if="selected === 'profile'"/>
    <adminPeopleList v-if="selected === 'trainers' || selected === 'athlete'" :type="selected"/>
    <adminCategories v-if="selected === 'category'"/>
    <adminCalendar v-if="selected === 'category'"/>

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
}</style>