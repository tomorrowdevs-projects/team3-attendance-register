<script setup>
//SCRIPT
import calendarJson from '../../calendar.json';
const color = ['-primary', '-success', '-danger', '-secondary', '-info', '-dark', '-light'];
console.log(calendarJson)
</script>


<template>
  <!-- TEMPLATE -->
  <div class="row row-cols-1 row-cols-md-3 g-4 p-3">

    <div v-for="(item, index) in calendarJson" :key="index" class="col">
      <div :class="'card h-100 border'+ color[index]">
        <div :class="'card-header text'+ color[index]"> {{ item.category }}</div>
        <div class="card-body">
          <h5 class="card-title"> {{ item.username_trainer }}</h5>
          <p class="card-text">{{ item.username_athlete }}</p>
        </div>
        <div class="card-footer">
          <small class="text-body-secondary"> {{ item.date }}</small>
          <img src="@/components/icons/edit.png" alt="edit">
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>
/* STYLE */

.card-header{
  text-align: center;
  text-shadow: 1px 1px 4px grey;
  font-size: 1.5em;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer img {
  width: 2em;
  cursor: pointer;
}
</style>