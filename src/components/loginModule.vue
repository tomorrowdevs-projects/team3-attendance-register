<script setup>
import axios from 'axios';
import { ref } from 'vue'

const emit = defineEmits(['login-success'])
const postData = {
  username: '',
  password: '',
};

const errors = {
  400: 'Incorrect Username and/or Password!',
  401: 'Incorrect Username and/or Password!',
  404: 'Generic error, try again'
}

let message = ref('');

const fetchData = () => {

  // for DEMO VERSION
  if (postData.username === 'admin' || postData.username === 'trainer')
      emit('login-success', { role: postData.username, username: postData.username })
  else message.value = errors[400]
  // end DEMO VERSION

/*   axios
    .post('http://localhost:2000/api/v1/login', postData)
    .then((response) => {
      console.log(response.data);
      if (response.data.status in errors) message.value = errors[response.data.status]
      else if (response.data.status === 201) emit('login-success', { role: response.data.role, username: postData.username })
    })  */

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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>

  <!-- For DEMO VERSION -->
  <p class="demo">( DEMO VERSION => Type ' admin ' or ' trainer ' in Username and a password that meets the minimum requirements )</p>
  <!-- end DEMO VERSION -->
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

button {
  box-shadow: 0 0 10px gray;
  transition: all 0.3s;
}

input {
  text-align: center;
  margin-bottom: .7em;
}

button:hover {
  transform: scale(1.1);
}

div:first-child {
  color: red;
  font-weight: 600;
}

/* for DEMO VERSION */

.demo {
  margin-top: 2em;
  color: red;
  font-weight: 700;
}
/* end DEMO VERSION */

@media (max-width: 577px) {
  section {
    max-width: 90%;
  }
}
</style>