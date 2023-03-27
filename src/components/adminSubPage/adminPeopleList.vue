<script setup>
import axios from 'axios';
import { ref, watchEffect, computed } from 'vue';
import Button from '../ui/Button.vue';
import ErrorMessage from '../ui/ErrorMessage.vue';

//JSON for test
//import trainerJson from '../../../trainer.json'
/* import athleteJson from '../../../athlete.json' */

// PROPS
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['event']);

//VARIABLE
const search = ref('all');
const selectedOrder = ref('hours');
let filteredList = computed(() => {
    let filtered = props.user.selected === 'trainer' ? [...props.user.users.filter(el => el.role === 'trainer').sort(compare)] : [...props.user.users.filter(el => el.role === 'athlete').sort(compare)];

    if (search.value !== 'all') filtered = filtered.filter(el => el.category.some(cat => cat === search.value))

    return filtered
});
const name = ref('');
const surname = ref('');
const username = ref('');
const edit = ref(false);
const formError = ref('');
const inputDisabled = ref(true);
const catEditUser = ref([]);
const catNewUser = ref([]);
let errorMessage = '';
const error = ref(false);
let oldUsername = '';
console.log(filteredList)
//write username from name and surname and capitalize first letter
watchEffect(() => {
    username.value = `${capitalizeFirstLetter(name.value)}${capitalizeFirstLetter(surname.value)}`;
})

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

//function to sort the list of trainers/athletes by name or by monthly hours
function compare(a, b) {
    const first = selectedOrder.value === 'hours' ? Number(a.mounthlyHoursWorked) : b.surname;
    const second = selectedOrder.value === 'hours' ? Number(b.mounthlyHoursWorked) : a.surname;
    if (first < second) return 1;
    if (first > second) return -1;
    return 0;
}

const deleteItem = (element) => {
    axios
        .delete(`http://localhost:2000/api/v1/managementMyApp/edit/del/${element.username}`)
        .then((response) => {
            if (response.data.status === 201) {
                filteredList.value.forEach((el, index) => {
                    if (el.username === element.username) filteredList.value.splice(index, 1)
                });
                emit('event');
                const modal = document.querySelector('#modal' + element.username);
                const bsModal = bootstrap.Modal.getInstance(modal);
                bsModal.hide();
                console.log(filteredList.value)
            } else {
                errorMessage = `Unexpected error (${response.data.status}), user not deleted, try again!`;
                error.value = true;
            }
        })
}

const resetForm = () => {
    const form = document.querySelector('#addNewForm');
    form.reset();
    catNewUser.value.length = 0;
    name.value = '';
    surname.value = '';
    username.value = '';
    error.value = false;
}

const editItem = (element) => {
    edit.value = true;
    inputDisabled.value = false;
    oldUsername = element.username;
}

const cancel = (element) => {
    edit.value = false;
    formError.value = '';
    error.value = false;
    inputDisabled.value = true;
}

const saveChange = (event) => {
    if (catEditUser.value.length === 0) {
        formError.value = 'Select at least one category.'
        return
    } else formError.value = '';
    const form = event.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    data.category = [...catEditUser.value];
    console.log(data, oldUsername);
    axios
        .patch(`http://localhost:2000/api/v1/managementMyApp/edit/${oldUsername}`, { ...data })
        .then((response) => {
            if (response.data.status === 201) { emit('event'); edit.value = false; formError.value = ''; inputDisabled.value = true; }
            else {
                errorMessage = `Unexpected error (${response.data.status}), user not edited, try again!`;
                error.value = true;
            }
        })
}

const printPdf = (element) => {
    console.log('pdf')
}

/* const errors = {
  400: 'Incorrect Username and/or Password!',
  401: 'Incorrect Username and/or Password!',
  404: 'Generic error, try again'
} */
//Add new user
const fetchNewUser = (event) => {
    if (catNewUser.value.length === 0) {
        formError.value = 'Select at least one category.'
        return
    }
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    data.category = [...catNewUser.value];
    data.password = data.username + '1000';
    data.confirmPassword = data.password;
    data.role = props.user.selected

    axios
        .post(`http://localhost:2000/api/v1/managementMyApp`, { ...data })
        .then((response) => {
            if (response.data.status === 201) {
                emit('event');
                const modal = document.querySelector('#modalAddNew');
                const bsModal = bootstrap.Modal.getInstance(modal);
                bsModal.hide();
                resetForm()
            }
            else {
                errorMessage = `Unexpected error (${response.data.status}), try again!`;
                error.value = true;
            }
        })
}
</script>

<template>
    <h2 class="title">List of {{ user.selected }}</h2>

    <div class="butContainer col-6">
        <Button :type="{ color: 'warning', title: 'Add New' }" data-bs-toggle="modal"
            data-bs-target="#modalAddNew" @click="resetForm"></Button>

        <Button :type="{ color: 'danger', title: `All ${user.selected} PDF` }"></Button>
    </div>

    <div class="searchContainer col-6">
        <div class="order">
            <h4>Order By</h4>
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" v-model="selectedOrder" name="hours" id="btnradio1" value="hours"
                    autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Hours</label>

                <input type="radio" class="btn-check" v-model="selectedOrder" name="name" id="btnradio2" value="name"
                    autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">Name</label>
            </div>
        </div>
        <select v-model="search" @change="filtered" class="form-select search" aria-label="Default select example">
            <option value="all" selected>ALL CATEGORIES</option>
            <option v-for="category in props.user.categories" :key="category" :value="category">{{ category }}</option>
        </select>
    </div>

    <div class="container">
        <div class="accordion accordion-flush" id="accordionFlushExample">

            <div v-for="trainer in filteredList" :key="trainer.username" class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#' + trainer.username" aria-expanded="false" :aria-controls="'#' + trainer.username">
                        {{ `${trainer.surname} ${trainer.name}` }} <span>{{ trainer.hours_minutes_of_training_mounth
                        }}</span>
                    </button>
                </h2>

                <div :id="trainer.username" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">

                        <ErrorMessage v-show="error" :message="errorMessage"></ErrorMessage>
                        
                        <form class="needs-validation" id="editForm" @submit.prevent="saveChange">

                            <div class="mb-3 row">
                                <label for="username" class="col-sm-4 col-form-label">Username</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control username" name="newUsername"
                                        :value="trainer.username" :disabled="inputDisabled">
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="name" class="col-sm-4 col-form-label">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control name" name="name" :value="trainer.name"
                                        :disabled="inputDisabled">
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="surname" class="col-sm-4 col-form-label">Surname</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control surname" name="surname" :value="trainer.surname"
                                        :disabled="inputDisabled">
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="email" class="col-sm-4 col-form-label">Email address</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control email" name="email" :value="trainer.email"
                                        :disabled="inputDisabled">
                                </div>
                            </div>

                            <!-- Default - if we are not in edit mode -->
                            <div v-if="!edit" class="editCat">
                                <div class="mb-3 row">
                                    <label for="category" class="col-sm-4 col-form-label">Category</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control category" :value="trainer.category"
                                            :disabled="inputDisabled">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="mounthlyHours" class="col-sm-4 col-form-label">Mounthly Hours</label>
                                    <div class="col-sm-8">
                                        <p class="mounthlyHours" style="user-select: none; margin: 6px;">{{
                                            trainer.hours_minutes_of_training_mounth }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- if in EDIT mode I add the category checkboxes -->
                            <div v-else class="cateContainer">
                                <p v-show="formError" id="formError">{{ formError }}</p>
                                <div class="mb-3 row">
                                    <label for="catefories" class="col-sm-4 col-form-label">Categories</label>
                                    <div class="col-sm-8">
                                        <div v-for="category in props.user.categories" :key="category"
                                            class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" v-model="catEditUser"
                                                role="switch" :id="category.replace(/\s/g, '')" :value="category">
                                            <label class="form-check-label" :for="category.replace(/\s/g, '')">{{ category
                                            }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--  -->
                            <div v-if="edit" :id="'saveBtn' + trainer.username" class="save">
                                <Button :type="{ color: 'danger', title: 'Cancel' }" @click="cancel(trainer)"></Button>
                                <Button :type="{ color: 'success', title: 'Save', type: 'submit' }"></Button>
                            </div>

                            <!--  -->
                            <div v-else :id="'saveIcon' + trainer.username" class="buttonContainer">
                                <img src="@/components/icons/trash.png" alt="delete" data-bs-toggle="modal"
                                    :data-bs-target="'#modal' + trainer.username" @click="error= false">
                                <img src="@/components/icons/edit.png" alt="edit" @click="editItem(trainer)">
                                <img src="@/components/icons/pdf.png" alt="pdf" @click="printPdf(trainer)">
                            </div>
                        </form>

                        <!-- Modal for Delete-->
                        <div class="modal fade" :id="'modal' + trainer.username" tabindex="-1"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <ErrorMessage v-show="error" :message="errorMessage"></ErrorMessage>
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure to delete it?</h1>
                                    </div>
                                    <div class="modal-footer">
                                        <Button :type="{ title: 'Close' }" data-bs-dismiss="modal"></Button>
                                        <Button :type="{ color: 'danger', title: 'Delete' }" @click="deleteItem(trainer)"></Button>
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
                    <ErrorMessage v-show="error" :message="errorMessage"></ErrorMessage>
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add new {{ user.selected }}</h1>
                </div>
                <div class="modal-body">

                    <form class="needs-validation" @submit.prevent="fetchNewUser" id="addNewForm">
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
                                <div v-for="category in props.user.categories" :key="category"
                                    class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" v-model="catNewUser" role="switch"
                                        :id="category.replace(/\s/g, '')" :value="category">
                                    <label class="form-check-label" :for="category.replace(/\s/g, '')">{{ category
                                    }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <Button :type="{ color: 'danger', title: 'Cancel' }" data-bs-dismiss="modal"></Button>
                            <Button :type="{ color: 'success', title: 'Save', type: 'submit' }"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    text-transform: uppercase;
    margin-bottom: .5em;
}

.search {
    background-image: url('@/components/icons/search.png');
    background-repeat: no-repeat;
    background-size: 2.2em;
    text-align: center;
    text-transform: uppercase;
    box-shadow: 0 0 13px grey;
}

.searchContainer {
    display: flex;
    gap: 2em;
}

.butContainer {
    display: flex;
    gap: 2em;
    margin-bottom: 2em;

}

.order {
    display: flex;
    gap: .5em;
    align-items: center;
}

.order h4 {
    width: 4em;
    margin-top: 2px;
}

.order label {
    margin-bottom: 0;
}

.btn-group {
    box-shadow: 0 0 13px grey;
}

.container {
    margin: 1em;
    height: 100%;
    max-width: 50%;
    padding-bottom: 3em;
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
    border-radius: 1.5em;
}

.accordion-button:not(.collapsed) {
    color: #000000;
}

.accordion-button span {
    position: absolute;
    right: 2.2em;
    border-radius: 50%;
    background-color: #557eb3;
    color: whitesmoke;
    font-weight: 700;
    padding: 4px;
    box-shadow: 0 0 4px darkblue;
}


.accordion-flush .accordion-item .accordion-button,
.accordion-flush .accordion-item .accordion-button.collapsed {
    border-radius: 1em;
    font-size: .7em;
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
        flex-direction: column;
        align-items: center;
    }

    .butContainer {
        width: 100%;
        padding: 0 1em;
    }

    .order {
        margin-bottom: .5em;
    }

    .searchContainer button {
        flex-basis: 8em;
        font-size: .9em !important;
    }

    #modalAddNew .col-form-label {
        padding-bottom: 0;
        padding-top: 0;
    }

    .accordion-flush .accordion-item .accordion-button,
    .accordion-flush .accordion-item .accordion-button.collapsed {
        font-size: .9em !important;
    }
}</style>