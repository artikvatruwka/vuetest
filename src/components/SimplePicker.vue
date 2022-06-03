<template>
  <div class="simple-picker">
    <text-base v-text="title"></text-base>
    <button
      v-for="(item, key) in items"
      :key="key"
      :class="key === selectedIndex ? 'selected' : ''"
      @click="$emit('select-item', item)"
      v-text="item"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";
import TextBase from "./TextBase.vue";

export default defineComponent({
  name: "SimplePicker",
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
  width: 100%;
  flex-direction: row;
  align-items: center;
}

button {
  all: unset;
  padding: 4px 12px;
  border: 1px solid #aeddb6;
  border-radius: 12px;
  font-family: "Roboto", sans-serif;
  margin-right: 12px;
  cursor: pointer;
}
button.selected {
  background: #aeddb6;
}
</style>
