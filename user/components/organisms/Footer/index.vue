<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">
          <span class="wave">👋</span>
          Blog - Cloudy
        </h3>
        <p class="footer-description">
          Chia sẻ kiến thức về lập trình, công nghệ và cuộc sống. Cùng nhau học
          hỏi và phát triển mỗi ngày.
        </p>
        <div class="social-links">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            class="social-link"
            :aria-label="social.name"
            @click="handleSocialClick(social.name)"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <div
          v-for="column in footerColumns"
          :key="column.title"
          class="footer-column"
        >
          <h4 class="column-title">{{ column.title }}</h4>
          <ul class="link-list">
            <li v-for="link in column.links" :key="link.name">
              <a
                href="#"
                class="footer-link"
                @click="handleFooterLinkClick(link.slug)"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="newsletter-section">
      <div class="newsletter-container">
        <div class="newsletter-content">
          <h3 class="newsletter-title">Đăng ký nhận tin tức</h3>
          <p class="newsletter-description">
            Nhận thông báo từ Blog - Cloudy trong hộp thư đến của bạn. Đăng ký
            nhận tin ngay và đừng bỏ lỡ nhé!!!
          </p>
        </div>
        <form class="newsletter-form" @submit="handleNewsletterSubmit">
          <div class="input-group">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Nhập email của bạn..."
              class="newsletter-input"
              :class="{ error: emailError }"
              required
            />
            <button
              type="submit"
              class="newsletter-button"
              :disabled="isSubmitting"
            >
              <i class="fas fa-paper-plane"></i>
              {{ isSubmitting ? 'Đang gửi...' : 'Đăng ký' }}
            </button>
          </div>
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
          <p v-if="successMessage" class="success-message">
            {{ successMessage }}
          </p>
        </form>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">
          © {{ currentYear }} Blog - Cloudy. All rights reserved.
        </p>
        <div class="footer-bottom-links">
          <a
            v-for="link in bottomLinks"
            :key="link.name"
            href="#"
            class="bottom-link"
            @click="handleBottomLinkClick(link.slug)"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      newsletterEmail: '',
      isSubmitting: false,
      emailError: '',
      successMessage: '',
      socialLinks: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/Obito890102',
          icon: 'fab fa-facebook-f',
        },
        { name: 'Twitter', url: '#', icon: 'fab fa-twitter' },
        { name: 'LinkedIn', url: '#', icon: 'fab fa-linkedin-in' },
        { name: 'GitHub', url: '#', icon: 'fab fa-github' },
      ],
      footerColumns: [
        {
          title: 'Nội dung',
          links: [
            { name: 'Bài viết mới nhất', slug: 'latest-posts' },
            { name: 'Web Development', slug: 'web-development' },
            { name: 'JavaScript', slug: 'javascript' },
            { name: 'React', slug: 'react' },
          ],
        },
        {
          title: 'Tài nguyên',
          links: [
            { name: 'Tools', slug: 'tools' },
            { name: 'Tutorials', slug: 'tutorials' },
            { name: 'Resources', slug: 'resources' },
            { name: 'Snippets', slug: 'snippets' },
          ],
        },
        {
          title: 'Liên hệ',
          links: [
            { name: 'Về tôi', slug: 'about' },
            { name: 'Dự án', slug: 'projects' },
            { name: 'Liên hệ', slug: 'contact' },
            { name: 'RSS Feed', slug: 'rss' },
          ],
        },
      ],
      bottomLinks: [
        { name: 'Privacy Policy', slug: 'privacy' },
        { name: 'Terms of Service', slug: 'terms' },
      ],
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    async handleNewsletterSubmit(e) {
      e.preventDefault()

      this.emailError = ''
      this.successMessage = ''

      if (!this.newsletterEmail) {
        this.emailError = 'Vui lòng nhập email của bạn'
        return
      }

      if (!this.isValidEmail(this.newsletterEmail)) {
        this.emailError = 'Email không hợp lệ'
        return
      }

      this.isSubmitting = true

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.successMessage = `Cảm ơn bạn đã đăng ký! Email: ${this.newsletterEmail}`
        this.newsletterEmail = ''

        // Emit event to parent component
        this.$emit('newsletter-subscribe', this.newsletterEmail)

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = ''
        }, 5000)
      } catch (error) {
        this.emailError = 'Có lỗi xảy ra, vui lòng thử lại sau'
      } finally {
        this.isSubmitting = false
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    handleSocialClick(socialName) {
      this.$emit('social-click', socialName)
    },

    handleFooterLinkClick(linkSlug) {
      this.$emit('footer-link-click', linkSlug)
    },

    handleBottomLinkClick(linkSlug) {
      this.$emit('bottom-link-click', linkSlug)
    },
  },
}
</script>

<style scoped>
.site-footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
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

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 400px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.column-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
  cursor: pointer;
}

.footer-link:hover {
  color: white;
  padding-left: 0.5rem;
}

.newsletter-section {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.newsletter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.newsletter-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.newsletter-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.input-group {
  display: flex;
  gap: 0.75rem;
  max-width: 500px;
}

.newsletter-input {
  flex: 1;
  padding: 1rem 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.newsletter-input.error {
  border-color: #ef4444;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-button {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.newsletter-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.newsletter-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.success-message {
  color: #10b981;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

.bottom-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  cursor: pointer;
}

.bottom-link:hover {
  color: white;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3rem 1rem 2rem;
    text-align: center;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .newsletter-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
    text-align: center;
  }

  .input-group {
    flex-direction: column;
    max-width: 100%;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 1rem;
    text-align: center;
  }

  .footer-bottom-links {
    justify-content: center;
  }
}
</style>
