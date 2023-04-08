<script setup>
    //SCRIPT
// PROPS
const props = defineProps({
    message: {
        type: String,
        required: true
    }
});

</script>


<template>
    <!-- TEMPLATE -->
    <p class="errorMessage"> {{ props.message }}</p>

</template>


<style scoped>
    /* STYLE */
.errorMessage{
    color: red;
    font-weight: 700;
    border-bottom: 1px solid red;
    text-align: center;
    text-shadow: none;
}

</style>