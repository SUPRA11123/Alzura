<template>
  <section>
    <h1>Vehicles</h1>
    <p><em>API: {{ apiBase }}</em></p>
    <div style="margin: 1rem 0">
      <button @click="load">Reload</button>
    </div>
    <table v-if="rows.length">
      <thead><tr><th>ID</th><th>Make</th><th>Model</th><th>Price</th><th></th></tr></thead>
      <tbody>
        <tr v-for="v in rows" :key="v.id">
          <td>{{ v.id }}</td>
          <td>{{ v.make }}</td>
          <td>{{ v.model }}</td>
          <td>€{{ v.price }}</td>
          <td><button @click="del(v.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <p v-else>No data.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
const rows = ref([]);
async function load(){
  const r = await fetch(`${apiBase}/vehicles`);
  rows.value = await r.json();
}
async function del(id){
  await fetch(`${apiBase}/vehicles/${id}`, { method: 'DELETE' });
  await load();
}
onMounted(load);
</script>
