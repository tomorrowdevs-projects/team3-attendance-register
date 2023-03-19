<script setup>
import { defineProps, ref, watchEffect } from 'vue';

//JSON for test
import trainerJson from '../../../trainer.json'
import athleteJson from '../../../athlete.json'

// PROPS
const props = defineProps({
    type: {
        type: String,
        required: true
    }
});

//VARIABLE
const search = ref('all');
let filteredList = props.type === 'trainers' ? ref([...trainerJson]) : ref([...athleteJson])
const filteredClone = [...filteredList.value];
const name = ref('');
const surname = ref('');
const username = ref('');
const email = ref('');
let formError = ref('');

watchEffect(() => {
    username.value = `${capitalizeFirstLetter(name.value)}${capitalizeFirstLetter(surname.value)}`
})

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

//GET categories from json
const categories = [...new Set(filteredClone.reduce((result, el) => result.concat(el.category), []))]

//UTILITY
const getAll = (el) => document.querySelectorAll(`${el}`);
const getId = (el) => document.getElementById(`${el}`);

/* const errors = {
  400: 'Incorrect Username and/or Password!',
  401: 'Incorrect Username and/or Password!',
  404: 'Generic error, try again'
} */
/*   axios
    .post('http://localhost:2000/api/v1/edit', {type: type})
    .then((response) => {
      console.log(response.data);
      
    })  */

const deleteItem = (element) => {
    console.log('delete', element)
}

const editItem = (element) => {
    const input = getAll(`#id${element.id} input`);
    input.forEach(el => el.removeAttribute('disabled'))

    getId(`saveIcon${element.id}`).style.display = 'none';
    document.getElementById(`saveBtn${element.id}`).style.display = 'flex';
}

const cancel = (element) => {
    const input = getAll(`#id${element.id} input`);
    input.forEach(el => el.setAttribute('disabled', true))
    getId(`saveIcon${element.id}`).style.display = 'flex';
    getId(`saveBtn${element.id}`).style.display = 'none';
}

const saveChange = (element) => {
    console.log('save')
}

const printPdf = (element) => {
    console.log('pdf')
}

//Filter Category
function filtered() {
    if (search.value === 'all') filteredList.value = [...filteredClone]
    else filteredList.value = filteredClone.filter(el => el.category.some(cat => cat === search.value))
}

//Add new user
const fetchNewUser = () => {
    const catNewUser = document.querySelectorAll('input[name="categories"]:checked')
    if (catNewUser.length === 0) {
        formError.value = 'Select at least one category.'
        return
    }
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    data.categories = [...Array.from(catNewUser).map(el => el.value)];
    console.log(data)
    // fetch data qui

    //if response ok
    form.reset()
    //close modal
    const modal = document.querySelector('#modalAddNew')
    const bsModal = bootstrap.Modal.getInstance(modal)
    bsModal.hide()
}

</script>

<template>
    <h2>List of {{ type }}</h2>

    <div class="searchContainer">
        <button class="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalAddNew">Add
            New</button>
        <select v-model="search" @change="filtered" class="form-select search" aria-label="Default select example">
            <option value="all" selected>ALL CATEGORIES</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
    </div>

    <div class="container">
        <div class="accordion accordion-flush" id="accordionFlushExample">

            <div v-for="trainer in filteredList" :key="trainer.id" class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#id' + trainer.id" aria-expanded="false" :aria-controls="'id' + trainer.id">
                        {{ `${trainer.name} ${trainer.surname}` }}
                    </button>
                </h2>
                <div :id="'id' + trainer.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="mb-3 row">
                            <label for="username" class="col-sm-4 col-form-label">Username</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control username" :value="trainer.username" disabled>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="name" class="col-sm-4 col-form-label">Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control name" :value="trainer.name" disabled>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="surname" class="col-sm-4 col-form-label">Surname</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control surname" :value="trainer.surname" disabled>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="email" class="col-sm-4 col-form-label">Email address</label>
                            <div class="col-sm-8">
                                <input type="email" class="form-control email" :value="trainer.email" disabled>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="category" class="col-sm-4 col-form-label">Category</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control category" :value="trainer.category" disabled>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="mounthlyHours" class="col-sm-4 col-form-label">Mounthly Hours</label>
                            <div class="col-sm-8">
                                <p class="mounthlyHours" style="user-select: none; margin: 6px;">{{
                                    trainer.mounthlyHoursWorked }}</p>
                            </div>
                        </div>

                        <div :id="'saveIcon' + trainer.id" class="buttonContainer">
                            <img src="@/components/icons/trash.png" alt="delete" data-bs-toggle="modal"
                                :data-bs-target="'#modal' + trainer.id">
                            <img src="@/components/icons/edit.png" alt="edit" @click="editItem(trainer)">
                            <img src="@/components/icons/pdf.png" alt="pdf" @click="printPdf(trainer)">
                        </div>
                        <div :id="'saveBtn' + trainer.id" class="save" style="display: none;">
                            <button class="btn btn-outline-danger" type="button" @click="cancel(trainer)">Cancel</button>
                            <button class="btn btn-outline-success" type="button" @click="saveChange(trainer)">Save</button>
                        </div>

                        <!-- Modal for Delete-->
                        <div class="modal fade" :id="'modal' + trainer.id" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure to delete it?</h1>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-outline-danger"
                                            @click="deleteItem(trainer)">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for ADD NEW-->
    <div class="modal fade" id="modalAddNew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add new {{ type }}</h1>
                </div>
                <div class="modal-body">

                    <form class="needs-validation" @submit.prevent="fetchNewUser">
                        <div class="mb-3 row">
                            <label for="name" class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                                <input v-model="name" name="name" type="text" class="form-control name" required>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="surname" class="col-sm-3 col-form-label">Surname</label>
                            <div class="col-sm-9">
                                <input v-model="surname" name="surname" type="text" class="form-control surname" required>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="username" class="col-sm-3 col-form-label">Username</label>
                            <div class="col-sm-9">
                                <input v-model="username" name="username" type="text" class="form-control username"
                                    required>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="email" class="col-sm-3 col-form-label">Email address</label>
                            <div class="col-sm-9">
                                <input name="email" type="email" class="form-control email" required>
                            </div>
                        </div>
                        <p v-if="formError" id="formError">{{ formError }}</p>
                        <div class="mb-3 row">
                            <label for="catefories" class="col-sm-3 col-form-label">Categories</label>
                            <div class="col-sm-9">
                                <div v-for="category in categories" :key="category" class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" name="categories"
                                        :id="category.replace(/\s/g, '')" :value="category">
                                    <label class="form-check-label" :for="category.replace(/\s/g, '')">{{ category
                                    }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-outline-success">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h2 {
    text-transform: uppercase;
}

.search {
    background-image: url('@/components/icons/search.png');
    background-repeat: no-repeat;
    background-size: 2.2em;
    text-align: center;
    text-transform: uppercase;
}

.searchContainer {
    display: flex;
    gap: 2em;
    width: 40%;
}

.container {
    margin: 1em;
    height: 100%;
    max-width: 50%;
}

.buttonContainer {
    display: flex;
    justify-content: space-between;
}

.save {
    display: flex;
    gap: 2em;
}

.buttonContainer img {
    cursor: pointer;
    width: 4em;
}

/* accordion */

.accordion-item {
    margin-top: 0.5em;
}

.accordion-button:not(.collapsed) {
    color: #000000;
}

/* Modal */

.modal-header {
    text-align: center;
    display: block;
    text-transform: uppercase;
}

.modal-title {
    margin: 0;
}

.modal-footer {
    flex-wrap: unset;
    gap: 3em;
}

.form-switch .form-check-input {
    margin-top: 10px;
}

#formError {
    color: red;
    text-align: center;
    margin: 0;
}

@media only screen and (max-width: 768px) {
    .container {
        max-width: 100%;
    }

    .search {
        width: 80%;
        font-size: .9em;
    }

    .searchContainer {
        width: 100%;
        gap: 1em;
    }

    .searchContainer button {
        flex-basis: 8em;
        font-size: .9em !important;
    }

    #modalAddNew .col-form-label {
        padding-bottom: 0;
        padding-top: 0;
    }
}
</style>