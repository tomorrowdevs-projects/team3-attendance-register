<script setup>
import { defineProps } from 'vue';
import adminProfile from "@/components/icons/adminProfile.png";
import trainer from "@/components/icons/trainer.png";
import athlete from "@/components/icons/athlete.png";
import category from "@/components/icons/category.png";
import calendar from "@/components/icons/calendar.png";

//PROPS
const props = defineProps({
    type: {
        type: Object,
        required: true
    }
});

/* props.type example:
{
    color: 'primary' or 'warning',   optional - default secondary  -->Bootstrap button color
    type: 'button' or 'submit',     optional - default button
    icons: 'adminProfile' or 'trainer' or 'none',    optional - default none -- icons object key, 'none' for nothing
    title: 'Save',    required!  the text of button
    class: 'otherClass'   optional - default nothing -- class to add 
}*/

const icons = {
    adminProfile: adminProfile,
    trainer: trainer,
    athlete: athlete,
    category: category,
    calendar: calendar,
}

</script>


<template>
    <!-- TEMPLATE -->
    <button :class="'btn btn-outline-' + (props.type.color || 'secondary') + ' ' + (props.type.class || '')" :type="props.type.type || 'button'">
        <img v-if="props.type.icons" :src="icons[props.type.icons]" :alt="props.type.icons"> {{ props.type.title }}</button>
</template>


<style scoped>
/* STYLE */

button {
    font-size: 1.5rem;
    font-weight: bolder;
    box-shadow: 0px 0px 16px 0px grey;
    transition: all .4s;
    width: 100%;
}

button:hover {
    box-shadow: none;
    transform: scale(1.1);
}

button img {
    width: 1.5em;
    float: left;
}

@media only screen and (max-width: 768px) {
    button{
        font-size: 1.1rem;
    }
}
</style>