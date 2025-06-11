<template>
  <header class="site-header">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h1 class="brand-title">
            <span class="wave">👋</span>
            Blog - Cloudy
          </h1>
        </div>

        <div class="nav-menu" :class="{ active: isMenuOpen }">
          <ul class="nav-list">
            <li>
              <a
                href="/"
                class="nav-link"
                :class="{ active: activeLink === 'home' }"
                @click="handleNavClick('home')"
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="/posts"
                class="nav-link"
                :class="{ active: activeLink === 'posts' }"
                @click="handleNavClick('posts')"
              >
                Bài viết
              </a>
            </li>
            <li>
              <a
                href="/about"
                class="nav-link"
                :class="{ active: activeLink === 'about' }"
                @click="handleNavClick('about')"
              >
                Về tôi
              </a>
            </li>
            <li>
              <a
                href="/contact"
                class="nav-link"
                :class="{ active: activeLink === 'contact' }"
                @click="handleNavClick('contact')"
              >
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-toggle" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false,
      activeLink: 'home',
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.setActiveLinkByRoute()
      },
      immediate: true,
    },
  },
  mounted() {
    this.setActiveLinkByRoute()
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleNavClick(linkName) {
      // this.activeLink = linkName
      this.isMenuOpen = false // Close mobile menu when clicking on links
      // Emit event to parent component if needed
      // this.$emit('nav-click', linkName)
    },
    setActiveLinkByRoute() {
      const path = this.$route.path
      if (path === '/') {
        this.activeLink = 'home'
      } else if (path.startsWith('/posts')) {
        this.activeLink = 'posts'
      } else if (path.startsWith('/about')) {
        this.activeLink = 'about'
      } else if (path.startsWith('/contact')) {
        this.activeLink = 'contact'
      }
    },
  },
}
</script>

<style scoped>
.site-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar {
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  text-decoration: none;
}

.wave {
  animation: wave 2s infinite;
  display: inline-block;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(20deg);
  }

  75% {
    transform: rotate(-10deg);
  }
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.active {
  color: #3b82f6;
  background-color: #eff6ff;
}

.nav-toggle {
  display: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-toggle:hover {
  color: #3b82f6;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .brand-title {
    font-size: 1.2rem;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border-top: 1px solid #e2e8f0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    padding: 1rem;
    gap: 0;
  }

  .nav-link {
    display: block;
    width: 100%;
    padding: 1rem;
    text-align: center;
  }

  .nav-toggle {
    display: block;
  }
}
</style>
