<script setup>
import { ref } from 'vue';
import AdminPage from './components/adminPage.vue';
import LoginModule from './components/loginModule.vue';
import TrainerPage from './components/trainerPage.vue';

const showLogin = ref(true);
const userRole = ref('none');

const handleLoginSuccess = (role) => {
  if (role === 'admin') userRole.value = 'admin'
  else if (role === 'trainer') userRole.value = 'trainer'
  showLogin.value = false
}

</script>

<template>
  <img src="@/components/icons/logo.png" alt="logoSport">

  <h1>Attendance Register App</h1>

  <LoginModule v-if="showLogin" @login-success="handleLoginSuccess"/>

  <AdminPage v-if="userRole === 'admin'" />

  <TrainerPage v-if="userRole === 'trainer'" />

</template>

<style scoped>
img {
  margin-bottom: 2em;
}

h1 {
  font-size: 2.5em;
  margin: 0 0 1.3em 0;
  text-shadow: 2px 2px 3px grey;
}
</style>


