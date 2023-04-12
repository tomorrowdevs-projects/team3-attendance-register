<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Button from '../ui/Button.vue';
import CheckableList from '../ui/CheckableList.vue';
import ErrorMessage from '../ui/ErrorMessage.vue';


// PROPS
const props = defineProps({
    category: {
        type: Object,
        required: true
    }
});

//EMIT
const emits = defineEmits(['cat-changed']);

//VARIABLES
const delClicked = ref(false);
const delString = ref('');
const catName = ref('');
const catNewUser = ref('');
const error = ref(false);
const reset = ref(false);
let errorMessage = '';
const errorAddNew = ref(false);

//get data from checkableList component
const getSelected = (item) => {
    catNewUser.value = item;
    if (catNewUser.value !== '') error.value = false
}

//delete a category
const deleteBut = () => {
    if (delString.value === 'Now') {
        delClicked.value = false;
        delString.value = '';
        error.value = false;
        reset.value = true;
        if (catNewUser.value !== '') {

        axios
            .delete(`http://localhost:2000/api/v1//category/del_category/${catNewUser.value}`, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
            .then((response) => {
            emits('cat-changed')
        })
        }
    } else {
        delClicked.value = true;
        delString.value = 'Now';
        error.value = true;
        reset.value = false
    }
}

//add new category
const addNew = () => {
    if (catName.value !== '') {
        axios
            .post('http://localhost:2000/api/v1/category', {category: catName.value}, { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
            .then((response) => {
                if(response.data.status === 404) { errorAddNew.value = true; errorMessage = 'This category already exists'}
                else if(response.data.status === 400) { errorAddNew.value = true; errorMessage = 'Unexpected error, please try again'}
                else if (response.data.status === 201) {
                    emits('cat-changed')
                    errorAddNew.value = false;
                    const modal = document.querySelector('#modalAddNew');
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    bsModal.hide();
                }
            })
        
        catName.value = ''
    }
}
</script>

<template>
    <h1>COURSES</h1>
    <div class="container col-6">
        <div class="butContainer">
            <Button :type="{ color: 'danger', title: `Delete ${delString}` }" @click="deleteBut"></Button>
            <Button :type="{ color: 'warning', title: 'Add New' }" data-bs-toggle="modal"
                data-bs-target="#modalAddNew"></Button>
        </div>

        <CheckableList :list="category" :enableCheck="delClicked" :error="error" :reset="reset" :type="'radio'"
            @output-data="getSelected"></CheckableList>
    </div>

    <!-- Modal for Add New Category-->
    <div class="modal fade" id="modalAddNew" tabindex="-1" aria-labelledby="addNewCategory" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <ErrorMessage v-show="errorAddNew" :message="errorMessage"></ErrorMessage>
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add new Course</h1>
                </div>
                <div class="modal-body">
                    <div class="mb-3 row">
                        <label for="name" class="col-sm-4 col-form-label">Name of course</label>
                        <div class="col-sm-8">
                            <input v-model="catName" name="name" type="text" class="form-control name">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <Button :type="{ title: 'Close' }" data-bs-dismiss="modal"></Button>
                    <Button :type="{ color: 'warning', title: 'Add' }" @click="addNew"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.butContainer {
    width: 100%;
    display: flex;
    gap: 3em;
    margin-bottom: 2em;
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
    .container {
        width: 100%;
    }

    .butContainer {
        width: 100%;
        font-size: .5em;
        margin-bottom: 5em;
    }
}
</style>