<script setup>
import { defineComponent, ref } from 'vue'


const name = ref('John Doe')
const email = ref('johndoe@example.com')
const password = ref('********')
const role = ref('user')
const phoneNumber = ref('123-456-7890')
const editing = ref(false)

const save = () => {
  // Send form data to server
  editing.value = false // Disable editing after saving
}

</script>

<template> 

<hr>
<form>
    <div>
      <!-- Bind the "name" input to the component's "name" data property -->
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" :disabled="!editing">
    </div>
    <div>
      <!-- Bind the "email" input to the component's "email" data property -->
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" :disabled="!editing">
    </div>
    <div>
      <!-- Bind the "password" input to the component's "password" data property -->
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" :disabled="!editing">
    </div>
    <div>
      <!-- Bind the "role" select to the component's "role" data property -->
      <label for="role">Role:</label>
      <select id="role" v-model="role" :disabled="!editing">
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
    <div>
      <!-- Bind the "phoneNumber" input to the component's "phoneNumber" data property -->
      <label for="phone">Phone Number:</label>
      <input type="tel" id="phone" v-model="phoneNumber" :disabled="!editing">
    </div>
    <div>
      <!-- Toggle the "editing" data property when the "Edit" button is clicked -->
      <button type="button" @click="editing = true" :disabled="editing" >Edit</button>
      <!-- Call the "save" method when the "Save" button is clicked -->
      <button type="submit" @click.prevent="save" :disabled="!editing">Save</button>
    </div>
  </form>


</template>


<style scope>
label {
    color: #333;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  input, select, button {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

  input:focus, select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    cursor: pointer;
    margin-top: 3em;
    transition: background-color 0.2s ease-in-out;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  form {
    max-width: 600px;
    margin: 0 auto;
  }

  button {
  margin-right: 1rem;
  margin-top: 1rem;
}
</style>


