<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});

const selected = ref('');

const selValue = (elem) => {
    selected.value = elem
}

const sendData = () => {

}

</script>

<template>
    <div class="d-grid gap-4 col-4 mx-auto">
        <button class="btn btn-outline-secondary profile" type="button"><img src="@/components/icons/adminProfile.png"
                alt="athlete"> {{ name.toLocaleUpperCase() }}'s Profile</button>

        <hr>

        <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button class="btn btn-outline-secondary col-9" type="button"><img src="@/components/icons/trainer.png"
                    alt="athlete">
                Trainers</button>
            <button type="button" class="btn btn-warning col-3 fsl" data-bs-toggle="modal" data-bs-target="#addNew"
                @click="selValue('trainer')">Add new</button>
        </div>
        <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button class="btn btn-outline-secondary col-9" type="button"><img src="@/components/icons/athlete.png"
                    alt="athlete">
                Athletes</button>
            <button type="button" class="btn btn-warning col-3 fsl" data-bs-toggle="modal" data-bs-target="#addNew"
                @click="selValue('athletes')">Add new</button>
        </div>
        <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button class="btn btn-outline-secondary col-9" type="button"><img src="@/components/icons/category.png"
                    alt="athlete">
                Categories</button>
            <button type="button" class="btn btn-warning col-3 fsl" data-bs-toggle="modal" data-bs-target="#addNew"
                @click="selValue('categories')">Add new</button>
        </div>
        <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button class="btn btn-outline-secondary col-9" type="button"><img src="@/components/icons/calendar.png"
                    alt="athlete">
                Calendar</button>
            <button type="button" class="btn btn-warning col-3"><img class="pdf" src="@/components/icons/pdfIcon.png"
                    alt="pdf"></button>
        </div>
    </div>

    <!-- Modal Ann New -->
    <div class="modal fade" id="addNew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add {{ selected }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form class="needs-validation" @submit.prevent="sendData">

                        <section v-if="selected === 'trainer' || selected === 'athletes'">
                            <div class="mb-3">{{ message }}</div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="validationCustom01" pattern="[0-9a-zA-Z]{3,}"
                                    placeholder="Name" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="validationCustom01" pattern="[0-9a-zA-Z]{3,}"
                                    placeholder="Surname" required>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" aria-label="Default select example" placeholder="Categoties"
                                    required>
                                    <option value="" disabled selected hidden>Categories</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </section>

                        <section v-else>
                            <div class="mb-3">{{ message }}</div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="validationCustom01" pattern="[0-9a-zA-Z]{3,}"
                                    placeholder="Category name" required>
                            </div>
                        </section>
                        <button type="submit" class="btn btn-outline-success">Save</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<style scope>
button {
    font-size: 1.5rem !important;
    font-weight: bolder !important;
}

.btn-group,
.profile {
    box-shadow: 0px 0px 16px 0px grey;
    transition: box-shadow .4s;
}

.btn-group:hover,
.profile:hover {
    box-shadow: none;
}

button img {
    width: 1.5em;
    float: left;
}

.fsl {
    font-size: 1em !important;
}

.pdf {
    width: 2em;
    float: unset;
}

/* modal */

button[type=submit] {
    margin: 0 auto;
    display: block;
}

.modal-title {
    text-transform: uppercase;
    text-shadow: 1px 1px 3px grey;
    font-weight: 500;
}
</style>