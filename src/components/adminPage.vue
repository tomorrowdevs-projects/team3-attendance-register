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
const categoryJson = ref([]);

async function getUsers () {
    await axios
        .get('http://localhost:2000/api/v1/select')
        .then((response) => { userJson.value.length = 0; userJson.value.push(...response.data.code) });

    await axios
        .get('http://localhost:2000/api/v1/categoryAll/list')
        .then((response) => { categoryJson.value.length = 0; categoryJson.value.push(...response.data.data.reduce((acc, el) => { acc.push(el.category); return acc }, [])) })
        //categoryJson.value.length = 0
    return userJson.value.length === 0 || categoryJson.value.length === 0
}

getUsers().then((res) => { if(res) selected.value = 'dbError' })

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

    <div v-if="selected === 'dbError'" class="dbError">DB ERROR => unable to access the DB, contact the administrator</div>

    <adminProfile v-if="selected === 'profile'" @profile-logout="emit('admin-logout')"/>

    <adminPeopleList v-if="selected === 'trainer' || selected === 'athlete'" :user="{selected, userJson, categoryJson}" @event="getUsers"/>

    <adminCategories v-if="selected === 'category'" :category="categoryJson" @cat-changed="getUsers"/>

    <adminCalendar v-if="selected === 'calendar'" />
</template>

<style scoped>

.back {
    width: 3em;
    cursor: pointer;
    transform: translate(15em);
}

.dbError{
    color: red;
    font-weight: 700;
    font-size: 2em;
    text-align: center;
    border: 1px solid red;
    border-radius: 2em;
    padding: 2em;
    box-shadow: 0 0 20px black;
    width: 90%;
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