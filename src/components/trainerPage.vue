<script setup>
import { ref, computed, watchEffect } from 'vue';
import athleteJson from '../../athlete.json'
import adminProfile from './trainerSubPage/trainerProfile.vue';
import adminCalendar from './trainerSubPage/trainerCalendar.vue';
import Button from './ui/Button.vue';
import CheckableList from './ui/CheckableList.vue';

//PROPS
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const trainerProfile = {
    username: 'CarloFreedom',
    category: ['yoga', 'pilates', 'spinning', 'bocce']
}

const selectedCategory = ref(trainerProfile.category[0]);
const athletes = computed(() => [...athleteJson.filter(el => el.category.some(cat => cat === selectedCategory.value))].sort(compare));
const selected = ref('');
const showBack = ref(false);
const newEvent = ref(false);
const red = ref('');
const date = new Date().toLocaleDateString('en-US', {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
}).replace(',', ' ');
const buttonColor = ['btn-outline-primary', 'btn-outline-success', 'btn-outline-danger', 'btn-outline-secondary', 'btn-outline-info', 'btn-outline-dark', 'btn-outline-light'];
const selectedAthletes = ref([]);
let durationString = '';

watchEffect(() => {
    if (selectedAthletes.value.length > 0) red.value = '';
});

function compare(a, b) {
    if (a.surname < b.surname) return -1;
    if (a.surname > b.surname) return 1;
    return 0;
}

const addNewEvent = () => {
    if (selectedAthletes.value.length === 0) {
        red.value = 'red'; return
    } else {
        newEvent.value = false;
        const form = event.target
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        let tmp = '';
        [tmp, durationString] = data.duration.split('-');
        data.duration = tmp;
        data.month = new Date().toLocaleDateString('en-US', { month: 'long' });
        data.date = Date.now();
        data.athletes = [...selectedAthletes.value];
        data.trainer = trainerProfile.username;
        const modal = document.querySelector('#modalSummary');
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        console.log(data, selectedAthletes);
        //selectedAthletes.value.length = 0;
    }
}

</script>

<template>
    <img v-show="showBack" class="back" src="@/components/icons/back.png" alt="back"
        @click="[selected, showBack] = ['', false]">

    <form @submit.prevent="addNewEvent" class="col-6">
        <div v-if="selected === ''" class="container">
            <div class="butContainer gap-4">
                <Button :type="{ title: 'Profile', icons: 'trainer' }"
                    @click="[selected, showBack] = ['profile', true]"></Button>
                <Button :type="{ title: 'Calendar', icons: 'calendar' }"
                    @click="[selected, showBack] = ['calendar', true]"></Button>
            </div>

            <Button v-if="!newEvent" :type="{ color: 'warning', title: 'ADD NEW EVENT', class: 'newEvent' }"
                @click="newEvent = true"></Button>

            <div v-else class="btn-group setNewEvent" role="group" aria-label="Button group with nested dropdown">
                <button type="button" class="btn btn-warning">{{ date }}</button>

                <select class="btn btn-warning dropdown-toggle" aria-label="Default select example" name="duration">
                    <optgroup label="Duration"></optgroup>
                    <option value="1-0:30">0:30</option>
                    <option value="2-1:00">1:00</option>
                    <option value="3-1:30">1:30</option>
                    <option value="4-2:00">2:00</option>
                    <option value="5-2:30">2:30</option>
                    <option value="6-3:00">3:00</option>
                    <option value="7-3:30">3:30</option>
                    <option value="8-4:00">4:00</option>
                </select>

                <button type="submit" class="btn btn-success save">Save</button>
            </div>

            <div class="categoryRadio">

                <div v-for="(category, index) in trainerProfile.category" :key="index" class="btn-group">
                    <input type="radio" class="btn-check" v-model="selectedCategory" name="category" :id="category"
                        :value="category" autocomplete="off" :checked="index === 0">
                    <label :class="'btn ' + buttonColor[index]" :for="category">{{ category }}</label>
                </div>
            </div>

            <CheckableList :list="{red: red, listItemArr: athletes}"></CheckableList>
            <!-- <div :class="'athleteList ' + red">
                <p>List of Athletes: {{ athletes.length }}</p>
                <span v-if="newEvent" :class="red">Selected: {{ selectedAthletes.length }}</span>
                <div class="col-12 catContainer" v-for="athlete in athletes" :key="athlete.id">
                    <div class="form-check form-switch">
                        <input v-if="newEvent" v-model="selectedAthletes" class="form-check-input" type="checkbox"
                            role="switch" :id="athlete.username" :value="athlete">
                        <label class="form-check-label" :for="athlete.username">{{ `${athlete.surname} ${athlete.name}`
                        }}</label>
                    </div>
                </div>
            </div> -->

            <!-- Modal for Summary-->
            <div class="modal fade" id="modalSummary" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ selectedCategory }}</h1>
                        </div>
                        <div class="modal-body">

                            <div class="mb-3 row">
                                <label for="name" class="col-sm-4 col-form-label">When ?</label>
                                <div class="col-sm-8">
                                    {{ `${date}` }}
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="surname" class="col-sm-4 col-form-label">For a duration of</label>
                                <div class="col-sm-8">
                                    {{ durationString }} hours
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="items" class="col-sm-4 col-form-label">Partecipants: {{ selectedAthletes.length
                                }}</label>
                                <div class="col-sm-8">
                                    <div v-for="items in selectedAthletes" :key="items.id">
                                        <p>{{ `${items.surname} ${items.name}` }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <Button :type="{ color: 'danger', title: 'Cancel' }" data-bs-dismiss="modal"></Button>
                                <Button :type="{ color: 'success', title: 'Confirm', type: 'submit' }"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </form>
    <adminProfile v-if="selected === 'profile'" />
    <adminCalendar v-if="selected === 'calendar'" />
</template>

<style scoped>
.butContainer {
    display: flex;
}

select {
    font-size: 1.2rem !important;
    font-weight: bolder !important;
    box-shadow: 0px 0px 16px 0px grey;
    transition: box-shadow .4s;
    width: 100%;
}

.btn-group {
    width: 100%;
}

.back {
    width: 3em;
    cursor: pointer;
    transform: translate(15em);
}

.red {
    color: red !important;
    border: 1px solid red !important;
}

.newEvent,
.setNewEvent {
    margin-top: 1.5em;
}

.setNewEvent button,
.setNewEvent select {
    margin: 3px;
    border-radius: 5px !important;

}

.categoryRadio {
    display: flex;
    justify-content: center;
    margin: 2em 0;
    gap: .2em;
    text-transform: uppercase;
}

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

.save {
    width: 30%;
}

.modal-header {
    display: block;
    text-align: center;
    text-transform: uppercase;
}

.modal-body {
    font-size: 1.2em;
}

.modal-body .col-sm-8 {
    padding: 6px;
    box-shadow: 0 0 13px gray;
    border-radius: .5em;
}

.modal-footer {
    flex-wrap: nowrap;
    gap: 3em;
}

@media only screen and (max-width: 768px) {

    form {
        width: 100%;
    }

    h1 {
        font-size: 1.5em !important;
    }

    .back {
        align-self: flex-end;
        transform: none;
    }

    .setNewEvent button,
    .setNewEvent select {
        font-size: 1em !important;
    }

    .col-form-label {
        text-align: center;
    }

    .modal-body .col-sm-8 {
        text-align: center;
        width: 90%;
        margin: 0 auto;
    }

    .btn-group>.btn {
        font-size: .9em;
    }
}</style>