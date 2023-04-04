<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import getData from '../JS/getData.js';
import personalProfile from './personalProfile.vue';
import Calendar from './calendar.vue';
import Button from './ui/Button.vue';
import DbError from './ui/DbError.vue';
import CheckableList from './ui/CheckableList.vue';

//PROPS
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['logout']);

const dataDB = ref([]);
const trainerCategory = ref([]);
let athletes = ref([]);
const selectedCategory = ref(trainerCategory.value[0]);

getData.getTrainerData(props.userInfo.username).then((res) => {
    dataDB.value = res.data;
    trainerCategory.value = [...new Set(res.data.reduce((acc, el) => { acc.push(el.category); return acc; }, []))];
    athletes.value = res.data.filter(el => el.category === trainerCategory.value[0]).sort(compare);

    if (res.status) selected.value = 'dbError'
})

watch(selectedCategory, (newValue, oldValue) => {
    athletes.value = dataDB.value.filter(el => el.category === newValue).sort(compare)
},
    {
        deep: true,
    }
);

const selected = ref('');
const showBack = ref(false);
const newEvent = ref(false);
const selectedAthletes = ref([]);
const error = ref(false);
const reset = ref(false);

let dataEvent = {};

const date = new Date().toLocaleDateString('en-US', {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
}).replace(',', ' ');

const buttonColor = ['btn-outline-primary', 'btn-outline-success', 'btn-outline-danger', 'btn-outline-secondary', 'btn-outline-info', 'btn-outline-dark', 'btn-outline-light'];

let durationString = ref('');

function compare(a, b) {
    if (a.surname < b.surname) return -1;
    if (a.surname > b.surname) return 1;
    return 0;
}

const getSelected = (item) => {
    selectedAthletes.value.length = 0;
    selectedAthletes.value.push(...item);
    if (selectedAthletes.value.length > 0) error.value = false
}

const addNewEvent = (event) => {
    if (selectedAthletes.value.length === 0) { error.value = true; return }
    else {
        error.value = false;
        const form = event.target
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        let tmp = '';
        [tmp, durationString.value] = data.number_of_training.split('-');
        data.number_of_training = Number(tmp);

        console.log(athletes.value,'athle')
        data.id_course = athletes.value[0].id_course;
        const selectedAthletesUsername = selectedAthletes.value.map(el => el.username_athlete);
        data.nome_ath = athletes.value.reduce((obj, athl) => {
            const { username_athlete } = athl;
            return { ...obj, [username_athlete]: selectedAthletesUsername.includes(username_athlete) };
        }, {});

        const modal = document.querySelector('#modalSummary');
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        dataEvent = {...data}
    }
}

const sendEvent = async () => {
    newEvent.value = false;
    reset.value = true;
    await axios
        .post(`http://localhost:2000/api/v1/calendary/${props.userInfo.username}`, dataEvent)
        .then((response) => console.log(response.data));

}

</script>

<template>
    <img v-show="showBack" class="back" src="@/components/icons/back.png" alt="back"
        @click="[selected, showBack] = ['', false]">

    <div v-if="selected === ''" class="container col-6">
        <div class="butContainer gap-4">
            <Button :type="{ title: `${props.userInfo.surname} Profile`, icons: 'trainer' }"
                @click="[selected, showBack] = ['profile', true]"></Button>
            <Button :type="{ title: 'Calendar', icons: 'calendar' }"
                @click="[selected, showBack] = ['calendar', true]"></Button>
        </div>

        <form @submit.prevent="addNewEvent">

            <Button v-if="!newEvent" :type="{ color: 'warning', title: 'ADD NEW EVENT', class: 'newEvent' }"
                @click="newEvent = true; reset = false"></Button>

            <div v-else class="btn-group setNewEvent" role="group" aria-label="Button group with nested dropdown">
                <button type="button" class="btn btn-warning">{{ date }}</button>

                <select class="btn btn-warning dropdown-toggle" aria-label="Default select example"
                    name="number_of_training">
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

                <div v-for="(category, index) in trainerCategory" :key="index" class="btn-group">
                    <input type="radio" class="btn-check" v-model="selectedCategory" name="category" :id="category"
                        :value="category" autocomplete="off" :checked="index === 0">
                    <label :class="'btn ' + buttonColor[index]" :for="category">{{ category }}</label>
                </div>
            </div>

            <CheckableList :list="athletes" :enableCheck="newEvent" :error="error" :reset="reset" :type="'checkbox'"
                @output-data="getSelected"></CheckableList>

            <!-- Modal for Summary-->
            <div class="modal fade" id="modalSummary" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-1" id="exampleModalLabel">{{ selectedCategory }}</h1>
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
                                <Button :type="{ color: 'success', title: 'Confirm', type: 'button' }"
                                    data-bs-dismiss="modal" @click="sendEvent"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <DbError v-if="selected === 'dbError'"></DbError>

    <personalProfile v-if="selected === 'profile'" :userInfo="userInfo" @profile-logout="emit('logout')" />
    <Calendar v-if="selected === 'calendar'" :category="trainerCategory" :type="'trainer'"/>
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

form {
    padding-bottom: 2em;
}

.save {
    width: 30%;
}

.modal-header {
    display: block;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 1px 1px 5px black;
}

.modal-title {
    margin: 0;
}

.modal-body {
    font-size: 1.2em;
}

.modal-body .col-sm-8 {
    padding: 6px;
    box-shadow: 0 0 13px gray;
    border-radius: .5em;
    width: 60%;
    background-color: blanchedalmond;
}

.modal-footer {
    flex-wrap: nowrap;
    gap: 3em;
}

@media only screen and (max-width: 768px) {

    .container {
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
}
</style>