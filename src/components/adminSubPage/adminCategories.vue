<script setup>
import {  ref } from 'vue';
import trainerJson from '../../../trainer.json';
import Button from '../ui/Button.vue';

//GET categories from json
const categories = [...new Set([...trainerJson].reduce((result, el) => result.concat(el.category), []))];

const delClicked = ref(false);
const delString = ref('');
const catName = ref('');
const catNewUser = ref([]);
const red = ref('');

const deleteBut = () => {
    if (delString.value === 'Now') {
        delClicked.value = false;
        delString.value = '';
        red.value = '';
        if (catNewUser.value.length > 0) {
            console.log(catNewUser.value);
            //qui richiamo l'api
        }
    } else {
        delClicked.value = true;
        delString.value = 'Now';
        red.value = 'border: 1px solid red';
    }
}

const addNew = () => {
    if (catName.value !== '') {
        console.log(catName.value);
        catName.value = ''
    }

}
</script>

<template>
    <h1>Categories</h1>
    <div class="container">
        <div class="butContainer">
            <Button :type="{ color: 'danger', title: `Delete ${delString}` }" @click="deleteBut"></Button>
            <Button :type="{ color: 'warning', title: 'Add New' }" data-bs-toggle="modal"
                data-bs-target="#modalAddNew"></Button>
        </div>


        <div class="col-12 catContainer" v-for="category in categories" :key="category">
            <div class="form-check form-switch" :style="red">
                <input v-if="delClicked" class="form-check-input" type="checkbox" v-model="catNewUser" role="switch"
                    name="categories" :id="category.replace(/\s/g, '')" :value="category">
                <label class="form-check-label" :for="category.replace(/\s/g, '')">{{ category }}</label>
            </div>
        </div>
    </div>

    <!-- Modal for Add New Category-->
    <div class="modal fade" id="modalAddNew" tabindex="-1" aria-labelledby="addNewCategory" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add new Category</h1>
                </div>
                <div class="modal-body">
                    <div class="mb-3 row">
                        <label for="name" class="col-sm-4 col-form-label">Name of Category</label>
                        <div class="col-sm-8">
                            <input v-model="catName" name="name" type="text" class="form-control name">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <Button :type="{ title: 'Close' }" data-bs-dismiss="modal"></Button>
                    <Button :type="{ color: 'warning', title: 'Add' }" data-bs-dismiss="modal" @click="addNew"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.butContainer {
    width: 40%;
    display: flex;
    gap: 3em;
    margin-bottom: 2em;
}

.catContainer {
    width: 40%;
    text-align: center;

}

.catContainer div {
    border-radius: 2em;
    box-shadow: 0 0 15px gray;
    margin-bottom: 1em;
    text-transform: uppercase;
    padding: 2px;
}

.catContainer h4 {
    margin: 0;
}

.form-check-input {
    position: absolute;
    right: 1em;
    top: .4em;
}

.form-switch .form-check-input:checked {
    background-color: red;
    border: none;
}

.catContainer label {
    margin: 0;
    font-size: 1.3rem;
}

.modal-header {
    text-align: center;
    display: block;
}

.modal-footer {
    flex-wrap: nowrap;
    gap: 3em;
}

@media only screen and (max-width: 768px) {

    .catContainer,
    .butContainer {
        width: 100%;
        font-size: .5em;
    }

    .catContainer {
        margin-bottom: 1.5em;
    }

    .form-check-input {
        top: 1em;
        width: 4em;
        height: 2em;
    }

}
</style>