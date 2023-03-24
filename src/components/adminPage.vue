<script setup>
import { ref } from 'vue';
import axios from 'axios';
import adminProfile from './adminSubPage/adminProfile.vue';
import adminPeopleList from './adminSubPage/adminPeopleList.vue';
import adminCategories from './adminSubPage/adminCategories.vue';
import adminCalendar from './adminSubPage/adminCalendar.vue';
import Button from './ui/Button.vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});
const emit = defineEmits(['admin-logout']);

const selected = ref('');
const showBack = ref(false);
const userJson = ref([]);

async function getUsers () {
    await axios
    .get('http://localhost:2000/api/v1/select')
    .then((response) => { userJson.value.length = 0; userJson.value.push(...response.data.code) })
}

getUsers();
</script>

<template>
    <img v-show="showBack" class="back" src="@/components/icons/back.png" alt="back"
    @click="[selected, showBack] = ['', false]">

    <div v-if="selected === ''" class="d-grid gap-4 col-4 mx-auto butContainer">
        <Button :type="{ icons: 'adminProfile', title: `${name.toLocaleUpperCase()} 's Profile` }"
            @click="[selected, showBack] = ['profile', true]"></Button>
        <hr>

        <Button :type="{ icons: 'trainer', title: 'Trainers' }"
            @click="[selected, showBack] = ['trainer', true]"></Button>

        <Button :type="{ icons: 'athlete', title: 'Athletes' }"
            @click="[selected, showBack] = ['athlete', true]"></Button>

        <Button :type="{ icons: 'category', title: 'Categories' }"
            @click="[selected, showBack] = ['category', true]"></Button>

        <Button :type="{ icons: 'calendar', title: 'Calendar' }"
            @click="[selected, showBack] = ['calendar', true]"></Button>

    </div>

    <adminProfile v-if="selected === 'profile'" @profile-logout="emit('admin-logout')"/>
    <adminPeopleList v-if="selected === 'trainer' || selected === 'athlete'" :user="{selected, userJson}" @event="getUsers"/>
    <adminCategories v-if="selected === 'category'" />
    <adminCalendar v-if="selected === 'calendar'" />
</template>

<style scoped>

.back {
    width: 3em;
    cursor: pointer;
    transform: translate(15em);
}

@media only screen and (max-width: 768px) {

    h1 {
        font-size: 1.5em !important;
    }

    .butContainer {
        width: 90%;
    }

    .back {
        align-self: flex-end;
        transform: none;
    }
}</style>