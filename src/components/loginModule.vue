<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Button from './ui/Button.vue';
import ChangePassword from './ui/ChangePassword.vue';

//EMIT
const emit = defineEmits(['login-success']);

//VARIABLES
const postData = {
  username: '',
  password: '',
};
const errors = {
  400: 'Incorrect Username and/or Password!',
  401: 'Incorrect Username and/or Password!',
  404: 'Generic error, try again'
};
let message = ref('');

//send the login data
const fetchData = () => {
  axios
    .post('http://localhost:2000/api/v1/login', postData, { withCredentials: true })
    .then((response) => {
      if (response.data.status in errors) message.value = errors[response.data.status]
      else if (response.data.status === 201) emit('login-success',response.data.data[0])
  }) 
}
</script>

<template>
  <section>
    <form class="needs-validation" @submit.prevent="fetchData">
      <div class="col-mb-3">{{ message }}</div>
      <div class="col-mb-3">
        <label for="validationCustom01" class="form-label">Username</label>
        <input type="text" class="form-control" id="validationCustom01" pattern="[0-9a-zA-Z]{3,}"
          v-model="postData.username" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$" v-model="postData.password" required>
        <div id="emailHelp" class="form-text">At least 8 characters, one uppercase, one lowercase and a number</div>
      </div>
      <Button :type="{color: 'primary', type: 'submit', title: 'Submit'}"></Button>
    </form>
    <hr>
    <p>Forgot your password? <a href="#" data-bs-toggle="modal"
      data-bs-target="#modalChangePassword">Click here</a></p>
  </section>

  <ChangePassword :forgotPassword="true"></ChangePassword>

</template>

<style scoped>
section {
  padding: 2rem;
  max-width: 30vw;
  box-shadow: 0px 0px 11px -1px black;
  border-radius: 1rem;
  text-align: center;
  background-color: #dde4ea;
}
section p{
  margin-bottom: 0;
}

input {
  text-align: center;
  margin-bottom: .7em;
}

div:first-child {
  color: red;
  font-weight: 600;
}

/* for DEMO VERSION */

.demo {
  margin-top: 2em;
  color:  red;
  font-weight: 700;
}
/* end DEMO VERSION */

@media (max-width: 768px) {
  section {
    max-width: 90%;
  }
}
</style>