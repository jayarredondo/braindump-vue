<script setup>
import { ref } from "@vue/reactivity"

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: 'success'
    },
    placeholder: {
        type: String,
        default: 'Type something...'
    },
    label: { type: String }
})

const emit = defineEmits(['update:modelValue'])

const textareaRef = ref('');

const focusTextarea = () => {
    textareaRef.value.focus();
}
// due to the setup method, we must explicitly expose methods passed to the the parent component.
defineExpose({
    focusTextarea
})

</script>
<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">{{label}}</label>
    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          v-model="modelValue"
          @input="$emit('update:modelValue', modelValue)"
        ></textarea>
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>