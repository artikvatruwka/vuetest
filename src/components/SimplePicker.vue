<template>
  <div class="simple-picker">
    <text-base v-text="title"></text-base>
    <button
      v-for="(item, key) in items"
      :key="key"
      :class="key === selectedIndex ? 'selected' : ''"
      @click="$emit('select-item', key)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";
import TextBase from "./TextBase.vue";

export default defineComponent({
  components: { TextBase },
  props: {
    title: String,
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
    selectedIndex: Number,
  },
});
</script>
<style scoped>
.simple-picker {
  flex-direction: row;
  align-items: center;
}
button.selected {
  background-color: #aeddb6;
}
</style>
