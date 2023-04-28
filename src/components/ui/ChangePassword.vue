<script setup>
//SCRIPT
import { ref } from 'vue';
import axios from 'axios';
import ErrorMessage from './ErrorMessage.vue';
import Button from './Button.vue';
import DynamicForm from './DynamicForm.vue';

//PROPS
const props = defineProps({
    forgotPassword: {
        type: Boolean,
    }
});

//VARIABLES
const errorMessage = ref('All fields are required, please enter them');
const error = ref(false);
const getData = ref(false);
const title = ref('change password');
const fieldsForm = [
  { label: 'Old Password', name: 'password', type: 'password'},
  { label: 'Password', name: 'newPassword', type: 'password'},
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password'}
];

//if the forgot password in the login form was clicked
if(props.forgotPassword) { 
    fieldsForm.length = 0; 
    fieldsForm.push({ label: 'Email', name: 'email', type: 'email'});
    title.value = 'We will send you an email with the procedure to reset your password';
};

//checks if the inputs are all compiled and if pass and conf pass are equal
const checkInput = (data) => { 
    if(!data.oldPassword || !data.password || !data.confirmPassword) { errorMessage.value = 'All fields are required, please enter them'; return true }
    
    else if(data.password !== data.confirmPassword) { errorMessage.value = 'Password and Confirm Password are not the same'; return true}

    else return false
};

//send the password changes to the db
const sendPassword = (data) => {
    props.forgotPassword ? error.value = false : error.value = checkInput(data);
    getData.value = false;
    //fetch data to db

    axios
        .put(`http://localhost:2000/api/v1/changePassword`, data,{ withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
        .then(response => console.log(response.data))
}

</script>

<template>
    <!-- TEMPLATE -->
    <div class="modal fade" id="modalChangePassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">

                    <ErrorMessage v-show="error" :message="errorMessage"></ErrorMessage>
                    <h1 class="modal-title fs-5" id="exampleModalLabel"> {{ title }}</h1>
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