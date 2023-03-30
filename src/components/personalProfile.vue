<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import Button from './ui/Button.vue';
import DynamicForm from './ui/DynamicForm.vue';

const props = defineProps({
  userInfo: {
    type: Object,
    require: true
  },
});

const editing = ref(false)

const emit = defineEmits(['profile-logout', 'update-profile']);

const logout = () => {
  console.log('test logout')
  axios
    .get('http://localhost:2000/api/v1/logout')
    .then((response) => {
      if (response.status === 200) {
        emit('profile-logout')
      }
    })
}

const formUpdate = (data) => {
  console.log('Data', data)
  data.newUsername = props.userInfo.username

  axios
    .patch(`http://localhost:2000/api/v1/managementMyApp/edit/${props.userInfo.username}`, { ...data })

    .then((response) => {
      if (response.data.status === 201) {
        emit('update-profile')
      }
    })
}

const fieldsForm = [
  { label: 'User name', name: 'username', type: 'text', value: props.userInfo.username, disable: true },
  { label: 'Name', name: 'name', type: 'text', value: props.userInfo.name },
  { label: 'Surname', name: 'surname', type: 'text', value: props.userInfo.surname },
  { label: 'e-mail', name: 'email', type: 'email', value: props.userInfo.email },
  { label: 'Role', name: 'role', type: 'text', disable: true, value: props.userInfo.role },
]

if (props.userInfo.role === 'trainer') fieldsForm.push({ label: 'Category', name: 'category', type: 'text', disable: true, value: props.userInfo.category })


</script>

<template>
  <DynamicForm :custom="fieldsForm" @form-data="formUpdate"> </DynamicForm>
  <section class="col-6">
    <img src="@/components/icons/password.jpg" alt="changePassword">
    <img src="@/components/icons/edit.png" alt="edit">
    <img src="@/components/icons/logout.png" alt="logout" @click="logout">
  </section>
</template>

<style scoped>

section{
  display: flex;
  justify-content: space-around;
}

section img{
  width: 4em;
}

@media only screen and (max-width: 768px) {
section{
  width: 100%;
}
}

</style>


