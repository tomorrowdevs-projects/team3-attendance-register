<script setup>
    //SCRIPT
    import { ref } from 'vue';
    import Button from './Button.vue';
    import ErrorMessage from './ErrorMessage.vue';
// PROPS
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  error: {
    type: Object
  }
});

const emit = defineEmits(['send-edit']);

const duration = ref(props.data.number_of_training);
const athSelected = ref([]);

for (const username in props.data.name_ath) { if (props.data.name_ath[username][0]) athSelected.value.push(username) }

function editEvent () {
    const ath = Object.keys(props.data.name_ath).reduce((obj, key) => { obj[key] = false; return obj }, {});
    athSelected.value.forEach(key => key in ath ? ath[key] = true : ath[key] = false);
    const date = new Date(props.data.date);
    emit('send-edit', { 
        id_course: props.data.id, 
        date: date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate(), 
        name_ath: ath, 
        number_of_training: Number(duration.value),
        category: props.data.category
    })
}

</script>


<template>
    <!-- TEMPLATE -->
<!-- Modal for edit event-->
<div class="modal fade" :id="'modalEditEvent' + props.data.mounth + new Date(props.data.date).getDate() + props.data.category" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ `${props.data.username_trainer} ${props.data.category.toUpperCase()}` }}</h1>
                    <ErrorMessage v-show="props.error.error" :message="props.error.message"></ErrorMessage>
                </div>
                <div class="modal-body">

                    <form class="needs-validation">
                        <label for="number_of_training" class="col-sm-3 col-form-label">Duration</label>
                        <select v-model="duration" class="btn btn-warning dropdown-toggle" aria-label="Default select example" name="number_of_training">
                            <option value="1">0:30</option>
                            <option value="2">1:00</option>
                            <option value="3">1:30</option>
                            <option value="4">2:00</option>
                            <option value="5">2:30</option>
                            <option value="6">3:00</option>
                            <option value="7">3:30</option>
                            <option value="8">4:00</option>
                        </select>
                        <hr>
                        <div class="mb-3 row">
                            <label for="catefories" class="col-sm-3 col-form-label">Athletes</label>
                            <div class="col-sm-9">
                                <div v-for="(ath, username) in props.data.name_ath" :key="ath[1]"
                                    class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch"
                                        v-model="athSelected" :value="username" :checked="ath[0]">
                                    <label class="form-check-label" >{{ `${ath[1]} ${ath[2]}`
                                    }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <Button :type="{ color: 'danger', title: 'Cancel' }" data-bs-dismiss="modal"></Button>
                            <Button :type="{ color: 'success', title: 'Save', type: 'button' }" @click="editEvent"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>


<style scoped>
    /* STYLE */
.modal-footer{
    flex-wrap: nowrap;
    gap: 3em;
}

</style>