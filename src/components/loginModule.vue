<script setup>
  //import axios from 'axios';
  import { ref } from 'vue'

  const emit = defineEmits(['login-success'])
  const postData = {
        userName: '',
        password: '',
  };

  let message = ref('');

  const errors = {
    400: 'Incorrect Username and/or Password!',
    401: 'Generic error, try again'
  }

  const fetchData = () => {
    const role = 'trainer';
    emit('login-success', role)
    //console.log(postData);
		/* axios
		  .post('http://localhost:2000/api/v1/login', postData)
		  .then((response) => {
        console.log(response)
      })
      .catch(err => console.log(err)) */
  }

</script>

<template>
  <section>
    <form class="needs-validation" @submit.prevent="fetchData">
      <div class="col-mb-3 ">{{ message }}</div>
      <div class="col-mb-3 ">
        <label for="validationCustom01" class="form-label">Username</label>
        <input type="text" class="form-control" id="validationCustom01" pattern="[0-9a-zA-Z]{3,}" v-model="postData.userName" required>
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

@media (max-width: 577px){
  section{
    max-width: 90%;
  }
}
</style>