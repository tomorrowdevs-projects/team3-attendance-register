<script setup>
import { ref } from 'vue';
import AdminPage from './components/adminPage.vue';
import LoginModule from './components/loginModule.vue';
import TrainerPage from './components/trainerPage.vue';

const showLogin = ref(true);
const userRole = ref('none');
const userName = ref('');

const handleLoginSuccess = (event) => {
  if (event.role === 'admin') userRole.value = 'admin'
  else if (event.role === 'trainer') userRole.value = 'trainer'
  userName.value = event.username;
  showLogin.value = false
}

</script>

<template>
    <img id="logo" src="@/components/icons/logo.png" alt="logoSport">

    <h1>Attendance Register App</h1>

    <LoginModule v-if="showLogin" @login-success="handleLoginSuccess" />

    <AdminPage v-if="userRole === 'admin'" :name="userName" />

    <TrainerPage v-if="userRole === 'trainer'" :name="userName" />
</template>

<style scoped>

img {
  width: 40%;
}

h1 {
  font-size: 2.5em;
  text-shadow: 2px 2px 3px grey;
}

@media only screen and (max-width: 768px) {
  #logo {
    width: 90%;
  }
}
</style>


