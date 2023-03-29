<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Button from '../ui/Button.vue';
import DynamicForm from '../ui/DynamicForm.vue';

const props = defineProps({
  userInfo:{
      type:Object,
      require: true
  },
});

const editing = ref(false)

const emit = defineEmits(['profile-logout']);

const save = () => {
  // Send form data to server
  editing.value = false // Disable editing after saving
}

const logout = () => {
  axios
    .get('http://localhost:2000/api/v1/logout')
    .then((response) => {
      if (response.status === 200) {
        emit('profile-logout')
      }
  }) 
}

const formUpdate = (data) => {
  console.log(data)
  axios
        .patch(`http://localhost:2000/api/v1/managementMyApp/edit/${props.userInfo.username}`, { ...data })
        
        .then((response) => {
            console.log(response)
        })
}

</script>

<template>

  <section>
    <Button :type="{ color: 'danger', title: 'Logout' }" @click="logout"></Button>
  </section>

<DynamicForm :field="['name','surname','psw','username','email']" 
  :custom="[{label: 'User name',name: 'username', type: 'text', value: userInfo.username, disable: true},
            {label: 'Password',name: 'password', type: 'password', value: 'da fare'},
            {label: 'Name',name: 'name', type: 'text', value: userInfo.name},
            {label: 'Surname',name: 'surname', type: 'text', value: userInfo.surname},
            {label: 'e-mail',name: 'email', type: 'email', value: userInfo.email},
            {label: 'Role',name: 'role', type: 'text',disable: true, value: userInfo.role},
            ]"
  @form-data="formUpdate"> 
</DynamicForm>

</template>

<style scoped>

</style>


