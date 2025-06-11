<template>
  <div id="app">
    <!-- Dynamic Layout Component -->
    <component :is="layoutComponent">
      <!-- Page Content -->
      <router-view v-if="$router" />
      <!-- Hoặc nếu không dùng router -->
      <HomePage v-if="!$router" />
    </component>
  </div>
</template>

<script>
// Import layouts
import DefaultLayout from './layouts/default.vue'
import HomePage from './pages/index.vue'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    HomePage,
  },
  computed: {
    layoutComponent() {
      // Nếu dùng với router
      if (this.$route && this.$route.meta && this.$route.meta.layout) {
        return `${this.$route.meta.layout}Layout`
      }

      // Nếu dùng với pages component
      if (
        this.$options.components.HomePage &&
        this.$options.components.HomePage.layout
      ) {
        return `${this.$options.components.HomePage.layout}Layout`
      }

      // Default layout
      return 'DefaultLayout'
    },
  },
}
</script>

<style>
/* Reset CSS global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  min-height: 100vh;
}
</style>
