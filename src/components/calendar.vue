<script setup>
//SCRIPT
import { ref, computed } from 'vue';
import Modal from './ui/Modal.vue';
import axios from 'axios';

// PROPS
const props = defineProps({
  category: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  calendar: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit']);

function getColor() {
  return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
}

function convertToTime(num) {
  var hours = Math.floor(num / 2);
  var minutes = (num % 2) * 30;
  return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
}

const color = props.calendar.map(el => getColor());
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: 10 }, (el, index) => 2023 + index);

const actualMonth = new Date().getMonth();
const actualYear = new Date().getFullYear();
const monthSelected = ref(actualMonth);
const yearSelected = ref(actualYear);
const categorySelected = ref(props.category[0]);
const trainerSelected = ref('all');
const trainerList = [ ...new Set(props.calendar.map(el => el.username_trainer)) ]
const error = ref(false);
const errorMessage = 'Unexpected error, try again';

const filtered = computed(() => {
  const data = props.calendar.sort((a, b) => new Date(a.date) - new Date(b.date));
  let filter = data.filter(el => {
    const date = new Date(el.date);
    return (monthSelected.value === 'all' ? true : date.getMonth() === monthSelected.value) && date.getFullYear() === yearSelected.value
  });

  if (categorySelected.value !== 'all') filter = filter.filter(elem => elem.category === categorySelected.value);
  if (trainerSelected.value !== 'all') filter = filter.filter(elem => elem.username_trainer === trainerSelected.value);
  return filter
})

function sendEdit (data) {
  const dataSplitted = data.date.split('-');
  axios
    .patch(`http://localhost:2000/api/v1/calendary_edit/`, data , { withCredentials: true, headers: {'Access-Control-Allow-Credentials': 'true'} })
    .then((response) => { 
      if(response.data.status === 201) {
        emit('edit');
        const modal = document.querySelector('#modalEditEvent' + dataSplitted[1] + dataSplitted[2] + data.category);
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
      } else {
        error.value = true;
      }
    });
}

</script>


<template>
  <!-- TEMPLATE -->
  <div class="searchContainer col-6">
    <p class="title">Search</p>
    <div class="dateContainer searchBox">
      <select v-model="monthSelected" class="form-select search" aria-label="Default select example">
        <option value="all"> ALL MONTH</option>
        <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}</option>
      </select>

      <select v-model="yearSelected" class="form-select search" aria-label="Default select example">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="trainerSport searchBox">
      <select v-model="categorySelected" class="form-select search" aria-label="Default select example">
        <option v-if="props.type === 'admin' || props.category.length > 1" value="all"> ALL COURSES</option>
        <option v-for="(cat, index) in props.category" :key="index" :value="cat">{{ cat }}</option>
      </select>

      <select v-if="props.type === 'admin'" v-model="trainerSelected" class="form-select search"
        aria-label="Default select example">
        <option value="all">ALL TRAINERS</option>
        <option v-for="(evnt, index) in trainerList" :key="index" :value="evnt">{{
          evnt
        }}</option>
      </select>
    </div>

  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4 p-3">

    <div v-for="(item, index) in filtered" :key="index" class="col">
      <div class="card h-100" :style="'border-color:' + color[index]">
        <div class="card-header" :style="'color:' + color[index]"> {{ item.category }}</div>
        <div class="card-body">
          <h5 v-if="props.type === 'admin'" class="card-title"> {{ item.username_trainer }}</h5>
          <h4 class="card-title"> Duration: h {{ convertToTime(item.number_of_training) }}</h4>
          <ul>
            <li v-for="elem in item.name_ath" v-show="elem[0]"> {{ `${elem[0]} ${elem[1]} ${elem[2]}` }}</li>
          </ul>
          <p class="card-text">{{ item.username_athlete }}</p>
        </div>
        <div class="card-footer">
          <small class="text-body-secondary"> {{ new Date(item.date).toLocaleDateString('en-US', {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          }).replace(',', ' ')
          }}</small>
          <img v-if="item.edit" src="@/components/icons/edit.png" alt="edit" data-bs-toggle="modal"
            :data-bs-target="'#modalEditEvent'+ item.mounth + new Date(item.date).getDate() + item.category">
          <Modal v-if="item.edit" :data="item" :error="{ error: error, message: errorMessage }" @send-edit="sendEdit"></Modal>
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

.card-header span{
  float: right;
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

.title {
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
  background-color: #4eb0b2;
  ;
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