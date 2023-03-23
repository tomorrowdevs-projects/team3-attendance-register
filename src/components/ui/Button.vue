<script setup>
//SCRIPT
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
const path = '/src/components/icons/'
const icons = {
    adminProfile: `${path}adminProfile.png`,
    trainer: `${path}trainer.png`,
    athlete: `${path}athlete.png`,
    category: `${path}category.png`,
    calendar: `${path}calendar.png`,
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
        font-size: 1em;
    }
}
</style>