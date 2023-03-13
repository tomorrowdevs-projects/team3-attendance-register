<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="d-grid gap-4 col-4 mx-auto">
        <button class="btn btn-outline-secondary" type="button"><img src="@/components/icons/adminProfile.png"
                alt="athlete"> {{ name.toLocaleUpperCase() }}'s Profile</button>

        <hr>

        <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button class="btn btn-outline-secondary" type="button"><img src="@/components/icons/trainer.png" alt="athlete">
                Trainers</button>
            <button type="button" class="btn btn-warning col-3" @click="type = 'trainer'">Add new</button>
        </div>
        <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button class="btn btn-outline-secondary" type="button"><img src="@/components/icons/athlete.png" alt="athlete">
                Athletes</button>
            <button type="button" class="btn btn-warning col-3" @click="type = 'athletes'">Add new</button>
        </div>
        <button class="btn btn-outline-secondary" type="button"><img src="@/components/icons/category.png" alt="athlete">
            Categories</button>
        <button class="btn btn-outline-secondary" type="button"><img src="@/components/icons/calendar.png" alt="athlete">
            Calendar</button>
    </div>
</template>

<style scope>
button {
    font-size: 1.5rem !important;
    font-weight: bolder !important;
}

button img {
    width: 1.5em;
    float: left;
}
</style>