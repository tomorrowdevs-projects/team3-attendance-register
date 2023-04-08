<script setup>
import { ref } from 'vue';
import AdminPage from './components/adminPage.vue';
import LoginModule from './components/loginModule.vue';
import TrainerPage from './components/trainerPage.vue';

//VARIABLES
const showLogin = ref(true);
const userRole = ref('');
const userInfo = ref([]);

//Emit of LoginModule, when the login is successful it enters the admin or trainer page depending on the user
const handleLoginSuccess = (event) => {
  if (event.role === 'admin') userRole.value = 'admin'
  else if (event.role === 'trainer') userRole.value = 'trainer'
  userInfo.value = event;
  showLogin.value = false
}

//Emit of Admin of Trainer page, when the user logs out he is redirected to the login page
const logout = () => {
  userRole.value = 'none';
  showLogin.value = true;
}

</script>

<template>
    <img id="logo" src="@/components/icons/logo.png" alt="logoSport">

    <h1>Attendance Register App</h1>

    <LoginModule v-if="showLogin" @login-success="handleLoginSuccess" />

    <AdminPage v-if="userRole === 'admin'" :userInfo="userInfo" @logout="logout"/>

    <TrainerPage v-if="userRole === 'trainer'" :userInfo="userInfo" @logout="logout"/>
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
  h1{
    font-size: 1.6em;
  }
}
</style>


