<script setup>
//SCRIPT
import { ref, computed } from 'vue';
import calendarJson from '../../calendar.json';

// PROPS
const props = defineProps({
  category: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

function getColor() {
  return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")//"#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

const color = calendarJson.map(el => getColor());
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: 10 }, (el, index) => 2023 + index);

const actualMonth = new Date().getMonth();
const actualYear = new Date().getFullYear();
const monthSelected = ref(actualMonth);
const yearSelected = ref(actualYear);
const categorySelected = ref(props.category[0]);
const trainerSelected = ref(calendarJson[0].username_trainer);

const filtered = computed(() => {
  const data = calendarJson.sort((a, b) => new Date(a.date) - new Date(b.date));
  let filter = data.filter(el => {
    const date = new Date(el.date);
    return (monthSelected.value === 'all' ? true : date.getMonth() === monthSelected.value) && date.getFullYear() === yearSelected.value
  });

  if (categorySelected.value !== 'all') filter = filter.filter(elem => elem.category === categorySelected.value)
  return filter
})
console.log(props.category)

</script>


<template>
  <!-- TEMPLATE -->
  <div class="searchContainer col-6">
    <p class="title">Search</p>
    <div class="dateContainer searchBox">
      <select v-model="monthSelected" class="form-select search" aria-label="Default select example">
        <option value="all"> ALL</option>
        <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}</option>
      </select>

      <select v-model="yearSelected" class="form-select search" aria-label="Default select example">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="trainerSport searchBox">
      <select v-model="categorySelected" class="form-select search" aria-label="Default select example">
        <option v-if="props.type === 'admin' || props.category.length > 1" value="all"> ALL</option>
        <option v-for="(cat, index) in props.category" :key="index" :value="cat">{{ cat }}</option>
      </select>

      <select v-if="props.type === 'admin'" v-model="trainerSelected" class="form-select search"
        aria-label="Default select example">
        <option value="all"> ALL</option>
        <option v-for="(evnt, index) in calendarJson" :key="index" :value="evnt.username_trainer">{{ evnt.username_trainer
        }}</option>
      </select>
    </div>

  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4 p-3">

    <div v-for="(item, index) in filtered" :key="index" class="col">
      <div class="card h-100" :style="'border-color:' + color[index]">
        <div class="card-header text" :style="'color:' + color[index]"> {{ item.category }}</div>
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

.card-header {
  text-align: center;
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  font-size: 1.5em;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row {
  justify-content: center;
}

.col {
  width: 20em !important;
}

.card-footer img {
  width: 2em;
  cursor: pointer;
}

.title{
  text-align: center;
  font-size: 2em;
}

.searchBox {
  display: flex;
  gap: .5em;
  flex-basis: 35em;
  border-radius: 1em;
  box-shadow: 0 0 8px -1px black;
  background-color: aliceblue;
  padding: .8em;
  margin: 1em;
}

.searchContainer {
  margin-top: .5em;
  box-shadow: 0 0 12px black;
  border-radius: 1em;
  background-color: #4eb0b2;;
}

.form-select {
  text-align: center;
  padding-right: 0 !important;
}

@media only screen and (max-width: 768px) {
  .searchContainer {
    width: 92%;
    flex-wrap: wrap;
  }

  .col,
  .row {
    width: 100% !important;
  }
}</style>