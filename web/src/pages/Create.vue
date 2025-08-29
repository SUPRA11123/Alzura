<template>
  <section>
    <h1>Create Vehicle</h1>
    <form @submit.prevent="submit">
      <label>Make <input v-model="make" required /></label><br/>
      <label>Model <input v-model="model" required /></label><br/>
      <label>Price <input v-model.number="price" type="number" min="0" step="0.01" required /></label><br/>
      <button type="submit">Save</button>
    </form>
    <p v-if="msg">{{ msg }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
const make = ref('');
const model = ref('');
const price = ref(null);
const msg = ref('');
async function submit(){
  const r = await fetch(`${apiBase}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ make: make.value, model: model.value, price: price.value })
  });
  msg.value = r.ok ? 'Created.' : 'Error.';
  if (r.ok) {
    make.value = '';
    model.value = '';
    price.value = null;
  }
}
</script>
