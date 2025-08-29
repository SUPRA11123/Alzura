<template>
  <div>
    <nav style="display:flex; gap:1rem; padding:1rem; border-bottom:1px solid #ddd">
      <router-link to="/">Vehicles</router-link>
      <router-link to="/create">Create</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <main style="padding:1rem">
      <router-view />
    </main>
  </div>
</template>
