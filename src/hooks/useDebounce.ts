import { ref, watch } from "vue";

export function useDebounce(valueRef: any, delay = 300) {
  const debouncedValue = ref(valueRef.value);

  watch(valueRef, (newValue) => {
    const handler = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedValue;
}
