// Custom Directive
export const vAutofocus = {
    // gives us access to the element when the component is mounted
    mounted: (el) => {
      el.focus();
    }
  }