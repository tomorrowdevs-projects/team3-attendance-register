<script setup>
//SCRIPT
import { ref } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import Button from './Button.vue';
import DynamicForm from './DynamicForm.vue';


const errorMessage = ref('All fields are required, please enter them');
const error = ref(false);
const getData = ref(false);

const fieldsForm = [
  { label: 'Old Password', name: 'oldPassword', type: 'password'},
  { label: 'Password', name: 'password', type: 'password'},
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password'}
]

const checkInput = (data) => { 
    if(!data.oldPassword || !data.password || !data.confirmPassword) { errorMessage.value = 'All fields are required, please enter them'; return true }
    
    else if(data.password !== data.confirmPassword) { errorMessage.value = 'Password and Confirm Password are not the same'; return true}

    else return false

}

const sendPassword = (data) => {
    error.value = checkInput(data);

    getData.value = false;
    console.log('send',data);
}

</script>


<template>
    <!-- TEMPLATE -->
    <div class="modal fade" id="modalChangePassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">

                    <ErrorMessage v-show="error" :message="errorMessage"></ErrorMessage>
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                </div>
                <div class="modal-body">

                    <DynamicForm :name="'ChangePassword'" :custom="fieldsForm" :disable="true" :submitData="getData" @form-data="sendPassword"></DynamicForm>

                </div>
                <div class="modal-footer">
                    <Button :type="{ color: 'danger', title: 'Cancel' }" data-bs-dismiss="modal" @click="error = false"></Button>
                    <Button :type="{ color: 'success', title: 'Save' }" @click="getData = true"></Button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* STYLE */
.modal-header{
    text-align: center;
    display: block;
    text-transform: uppercase;
}
.modal-footer{
    flex-wrap: unset;
    gap: 2em;
}
</style>