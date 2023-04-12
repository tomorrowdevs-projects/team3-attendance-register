<script setup>
import { ref } from 'vue';
import axios from 'axios';
import ChangePassword from "./ui/ChangePassword.vue";
import Button from "./ui/Button.vue";
import DynamicForm from './ui/DynamicForm.vue';
import utils from '../JS/utils';

//PROPS
const props = defineProps({
  userInfo: {
    type: Object,
    require: true
  },
});

//EMIT
const emit = defineEmits(['profile-logout', 'update-profile']);

//VARIABLES
const editing = ref(true);
const getData = ref(false);
const formDisable = ref(false);

//logout go back to the login page
const logout = () => {
  axios
    .get('http://localhost:2000/api/v1/logout', { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
    .then((response) => {
      if (response.status === 200) {
        emit('profile-logout')
      }
    })
}

//send data by api
const formUpdate = (data) => {
  data.newUsername = props.userInfo.username
  getData.value = false
  //send data by api
}

//Define the fields of the form
const fieldsForm = [
  { label: 'User name', name: 'username', type: 'text', value: props.userInfo.username, disable: true },
  { label: 'Name', name: 'name', type: 'text', value: props.userInfo.name },
  { label: 'Surname', name: 'surname', type: 'text', value: props.userInfo.surname },
  { label: 'e-mail', name: 'email', type: 'email', value: props.userInfo.email },
  { label: 'Role', name: 'role', type: 'text', disable: true, value: props.userInfo.role },
];

//if trainer show monthly hours
if (props.userInfo.role === 'trainer') 
  fieldsForm.push({ label: 'Mounthly Hours', name: 'hours', type: 'text', disable: true, value: utils.convertToTime(props.userInfo.hours_minutes_of_training_mounth) })

</script>

<template>

  <div class="col-6 mt-4">
    <DynamicForm :name="'Profile'" :custom="fieldsForm" :disable="formDisable" :submit-data="getData" @form-data="formUpdate"> </DynamicForm>
  </div>

  <section v-if="editing" class="col-6">
    <img src="@/components/icons/password.jpg" alt="changePassword" data-bs-toggle="modal"
      data-bs-target="#modalChangePassword">

    <img src="@/components/icons/edit.png" alt="edit" @click="editing = false; formDisable = true">

    <img src="@/components/icons/logout.png" alt="logout" @click="logout">
  </section>

  <div v-else class="button-container col-6 mt-3">
    <Button :type="{ color: 'danger', title: 'Cancel' }" @click="editing = true; formDisable = false"></Button>

    <Button :type="{ color: 'success', title: 'Save', type: 'submit' }" @click="getData = true"></Button>
  </div>

  <ChangePassword></ChangePassword>

</template>

<style scoped>
.button-container {
  display: flex;
  gap: 3em;
}

section {
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
  padding: 0 2em;
}

section img {
  width: 4em;
}

@media only screen and (max-width: 768px) {
  section {
    width: 100%;
  }

  .col-6{
    padding: 0 1em;
    width: 100%;
  }
}
</style>


