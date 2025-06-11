<template>
  <div class="layout-default">
    <!-- Header Component -->
    <Header @nav-click="handleNavigation" />

    <!-- Main Content Slot -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer Component -->
    <Footer
      @newsletter-subscribe="handleNewsletterSubscribe"
      @social-click="handleSocialClick"
      @footer-link-click="handleFooterNavigation"
      @bottom-link-click="handleBottomNavigation"
    />
  </div>
</template>

<script>
import Header from '~/components/organisms/Header/index.vue'
import Footer from '~/components/organisms/Footer/index.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer,
  },
  methods: {
    handleNavigation(linkName) {
      console.log('Navigation:', linkName)
      // Handle navigation logic
      this.$emit('nav-click', linkName)
    },
    handleNewsletterSubscribe(email) {
      console.log('Newsletter subscription:', email)
      // Handle newsletter subscription
      this.$emit('newsletter-subscribe', email)
    },
    handleSocialClick(platform) {
      console.log('Social click:', platform)
      // Handle social media tracking
      this.$emit('social-click', platform)
    },
    handleFooterNavigation(slug) {
      console.log('Footer navigation:', slug)
      // Handle footer navigation
      this.$emit('footer-link-click', slug)
    },
    handleBottomNavigation(slug) {
      console.log('Bottom navigation:', slug)
      // Handle policy page navigation
      this.$emit('bottom-link-click', slug)
    },
  },
}
</script>

<style scoped>
/* Layout CSS để đảm bảo footer luôn ở cuối */
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

<style>
/* Global CSS cho toàn bộ app */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8fafc;
}

#__nuxt,
#app {
  min-height: 100vh;
}
</style>
