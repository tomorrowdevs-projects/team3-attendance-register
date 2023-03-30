<script setup>
import { ref, watch, onMounted  } from 'vue';
import axios from 'axios';
import Button from './ui/Button.vue';
import DynamicForm from './ui/DynamicForm.vue';

const props = defineProps({
  userInfo:{
      type:Object,
      require: true
  },
});

console.log('xxx', props.userInfo)

// Use a reactive object to keep the updated form data
const cloneUserInfo = ref({})
onMounted(() => {
  // Initialize cloneUserInfo with the value of props.userInfo
  Object.keys(props.userInfo).forEach(key => {
    cloneUserInfo.value[key] = props.userInfo[key]
  })
})

console.log(cloneUserInfo)

const editing = ref(false)

const emit = defineEmits(['profile-logout', 'update-profile']);

const save = () => {
  // Send form data to server
  editing.value = false // Disable editing after saving
}

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
  console.log('Data',data)
  data.newUsername = props.userInfo.username

  Object.keys(data).forEach(key => {
    cloneUserInfo.value[key] = data[key]
  })

  axios
    .patch(`http://localhost:2000/api/v1/managementMyApp/edit/${props.userInfo.username}`, { ...data })

    .then((response) => {
        if (response.data.status === 201){
          emit('update-profile')
        }
    })
}

const fieldsForm = [
    {label: 'User name',name: 'username', type: 'text', value: cloneUserInfo.username, disable: true},
    {label: 'Name',name: 'name', type: 'text', value: cloneUserInfo.name},
    {label: 'Surname',name: 'surname', type: 'text', value: cloneUserInfo.surname},
    {label: 'e-mail',name: 'email', type: 'email', value: cloneUserInfo.email},
    {label: 'Role',name: 'role', type: 'text',disable: true, value: cloneUserInfo.role},
]

if (props.userInfo.role==='trainer')fieldsForm.push({label: 'Category',name: 'category', type:'text' ,disable: true, value: cloneUserInfo.category})


</script>

<template>

  <section>
    <Button :type="{ color: 'danger', title: 'Logout' }" @click="logout"></Button>
  </section>

<DynamicForm  :custom="fieldsForm"  @form-data="formUpdate"> </DynamicForm>


</template>

<style scoped>

</style>


