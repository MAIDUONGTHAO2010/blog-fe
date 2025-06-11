<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Liên hệ với tôi</h1>
        <p class="hero-subtitle">
          Hãy kết nối và chia sẻ những ý tưởng thú vị cùng nhau!
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <!-- Contact Info -->
        <div class="contact-info">
          <h2 class="section-title">Kết nối với tôi</h2>
          <p class="section-description">
            Tôi luôn sẵn sàng lắng nghe và trao đổi về công nghệ, dự án thú vị,
            hoặc đơn giản chỉ là để chào hỏi. Hãy liên hệ với tôi qua các kênh
            sau:
          </p>

          <div class="contact-methods">
            <!-- Gmail -->
            <div class="contact-card gmail-card">
              <div class="contact-icon gmail">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="contact-details">
                <h3>Email</h3>
                <p class="contact-value">mdthao1998@gmail.com</p>
                <p class="contact-description">
                  Gửi email cho tôi để thảo luận về dự án hoặc cơ hội hợp tác
                </p>
                <a
                  href="mailto:mdthao1998@gmail.com"
                  class="contact-button"
                  @click="trackContact('email')"
                >
                  <span>Gửi Email</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 19.5523 17.5523 20 17 20H5C4.44772 20 4 19.5523 4 19V7C4 6.44772 4.44772 6 5 6H11M15 3H21V9M10 14L21 3"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Facebook -->
            <div class="contact-card facebook-card">
              <div class="contact-icon facebook">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.413C10.125 6.388 11.917 4.715 14.658 4.715C15.97 4.715 17.344 4.953 17.344 4.953V7.928H15.83C14.34 7.928 13.875 8.84 13.875 9.775V12.073H17.203L16.671 15.563H13.875V24C19.612 23.094 24 18.1 24 12.073Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="contact-details">
                <h3>Facebook</h3>
                <p class="contact-value">fb.com/duongthao.dev</p>
                <p class="contact-description">
                  Kết bạn và theo dõi những chia sẻ về cuộc sống và công việc
                </p>
                <a
                  href="https://facebook.com/duongthao.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-button"
                  @click="trackContact('facebook')"
                >
                  <span>Kết nối Facebook</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 19.5523 17.5523 20 17 20H5C4.44772 20 4 19.5523 4 19V7C4 6.44772 4.44772 6 5 6H11M15 3H21V9M10 14L21 3"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-section">
          <h2 class="section-title">Gửi tin nhắn</h2>
          <p class="section-description">
            Hoặc bạn có thể điền form dưới đây, tôi sẽ phản hồi sớm nhất có thể.
          </p>

          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Họ tên</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="form-input"
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="form-input"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div class="form-group">
              <label for="subject">Chủ đề</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="form-input"
                placeholder="Chủ đề tin nhắn"
              />
            </div>

            <div class="form-group">
              <label for="message">Tin nhắn</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                class="form-textarea"
                rows="6"
                placeholder="Nội dung tin nhắn của bạn..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Gửi tin nhắn</span>
              <span v-else>Đang gửi...</span>
            </button>
          </form>

          <!-- Success Message -->
          <div v-if="showSuccess" class="success-message">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Cảm ơn bạn! Tin nhắn đã được gửi thành công.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Hãy cùng tạo nên điều tuyệt vời!</h2>
        <p>Tôi luôn sẵn sàng cho những dự án thú vị và cơ hội hợp tác mới.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// SEO Meta tags
useHead({
  title: 'Liên hệ - Dương Thảo',
  meta: [
    {
      name: 'description',
      content:
        'Liên hệ với Dương Thảo - Software Engineer. Kết nối qua Email hoặc Facebook để thảo luận về dự án và cơ hội hợp tác.',
    },
    {
      property: 'og:title',
      content: 'Liên hệ - Dương Thảo',
    },
    {
      property: 'og:description',
      content:
        'Kết nối với tôi để thảo luận về công nghệ, dự án thú vị và cơ hội hợp tác',
    },
  ],
})

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

// Submit form
const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    // Show success message
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Track contact interactions
const trackContact = (method) => {
  // You can add analytics tracking here
  console.log(`Contact via ${method}`)
}
</script>

<style scoped>
.contact-page {
  width: 80%;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Contact Content */
.contact-content {
  padding: 80px 0;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #2c3e50;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.8;
}

/* Contact Methods */
.contact-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  justify-content: space-between;
  min-height: 400px;
}

.contact-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 24px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.gmail-card {
  align-self: flex-start;
}

.facebook-card {
  align-self: flex-end;
  margin-top: auto;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.contact-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon.gmail {
  background: linear-gradient(135deg, #ea4335 0%, #fbbc04 100%);
  color: white;
}

.contact-icon.facebook {
  background: linear-gradient(135deg, #1877f2 0%, #42a5f5 100%);
  color: white;
}

.contact-details h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.contact-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #667eea;
  margin-bottom: 12px;
}

.contact-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* Contact Form */
.contact-form-section {
  height: 100%;
}

.contact-form {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  margin-top: 20px;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 968px) {
  .container {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}

@media (max-width: 768px) {
  .contact-page {
    width: 95%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .contact-card {
    flex-direction: column;
    text-align: center;
  }

  .contact-icon {
    align-self: center;
  }

  .contact-form {
    padding: 24px;
  }

  .cta-content h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .contact-content {
    padding: 60px 0;
  }

  .container {
    padding: 0 15px;
  }

  .contact-card {
    padding: 24px;
  }
}
</style>
