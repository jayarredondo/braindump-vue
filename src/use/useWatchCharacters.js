import { watch } from 'vue';

export function useWatchCharacters(valueToWatch, maxLength = 100) {
    // watch characters
watch(valueToWatch, (newValue) => {
    if (newValue.length === maxLength) {
      alert(`Only ${maxLength} characters allowed!`)
    }
  })
}