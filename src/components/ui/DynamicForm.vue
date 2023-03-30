<script setup>
import Button from './Button.vue';
import { ref } from 'vue';

    //SCRIPT
const props = defineProps({
    custom:{
        type:Array,
        require: true
    },
});

const enterButton = ref(true)
const formEditable = ref(false)

const emit = defineEmits(['form-data']);

const editProfile = (event) =>{
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    emit('form-data', data)
}

</script>

<template>   

<form class="needs-validation col-6" @submit.prevent="editProfile">

    <div class="mb-3 row" v-for="(field, index) in props.custom" :key="index">
        <label for="customized" class="col-sm-3 col-form-label">{{field.label}}</label>
        <div class="col-sm-9">
            <input class="form-control customized" :name="field.name" :type="field.type" :value="field.value" :disabled="formEditable ? field.disable : true">
        </div>
    </div>

    <img  v-if="enterButton" src="@/components/icons/edit.png" alt="edit" @click="formEditable = true; enterButton = false">

    <div v-else class="button-container">
        <Button :type="{ color: 'danger', title: 'Cancel' }" @click="formEditable = false; enterButton = true;"></Button>
        <Button :type="{ color: 'success', title: 'Save', type: 'submit' }" ></Button>
    </div>

</form>

</template>


<style scoped>
    /* STYLE */

    .button-container{
        display: flex;
        gap: 1em;
        margin: 2em 2em;
    }
    img{
        cursor: pointer;
        width: 4em;
        margin: 2em auto;
        display: block;
    }

    @media only screen and (max-width: 768px) {
        form{width: 100%; 
            padding: 1em 2em;    
        }
    
    
    }


</style>