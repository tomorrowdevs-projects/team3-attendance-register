<script setup>
import { watchEffect } from 'vue';

    //SCRIPT
const props = defineProps({
    custom:{
        type:Array,
        require: true
    },
    disable:{
        type:Boolean,
        require: true
    },
    submitData: {
        type:Boolean
    },
    name:{
        type: String,
        require: true
    }
});

const emit = defineEmits(['form-data']);


const editProfile = () =>{
    const formData = new FormData(document.getElementById(`form${props.name}`))
    const data = Object.fromEntries(formData.entries())
    emit('form-data', data)
}

watchEffect( () => { if(props.submitData) editProfile() } )


</script>

<template>   

<form :id="'form' + props.name" class="needs-validation mb-4">

    <div class="mb-3 row" v-for="(field, index) in props.custom" :key="index">
        <label for="customized" class="col-sm-4 col-form-label">{{field.label}}</label>
        <div class="col-sm-8">
            <input class="form-control customized" :name="field.name" :type="field.type" :value="field.value" :disabled="disable ? field.disable : true">
        </div>
    </div>

</form>

</template>


<style scoped>
    /* STYLE */

</style>