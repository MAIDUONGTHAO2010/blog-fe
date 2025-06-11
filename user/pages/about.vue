<template>
  <div class="about-page">
    <!-- Giới thiệu Section -->
    <section class="intro-section">
      <div class="container">
        <div class="content-wrapper">
          <div class="text-content">
            <h1 class="section-title">Giới thiệu</h1>
            <p class="intro-text">
              Xin chào! Mình là <strong>Dương Thảo</strong>, sinh năm
              <strong>1998</strong>, hiện đang là một
              <strong>Software Engineer</strong> với hơn
              <strong>3 năm kinh nghiệm</strong>
              trong lĩnh vực phát triển phần mềm. Mình luôn đam mê công nghệ và
              không ngừng học hỏi để hoàn thiện kỹ năng lập trình, xây dựng sản
              phẩm chất lượng và mang lại giá trị thực tiễn.
            </p>
          </div>
          <div class="image-content">
            <img
              :src="`/images/default.jpeg`"
              alt="Dương Thảo - Software Engineer"
              class="section-image"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Kinh nghiệm Section -->
    <section class="experience-section">
      <div class="container">
        <div class="content-wrapper reverse">
          <div class="image-content">
            <img
              :src="`/images/default.jpeg`"
              alt="Kinh nghiệm lập trình"
              class="section-image"
            />
          </div>
          <div class="text-content">
            <h2 class="section-title">Kinh nghiệm</h2>
            <p class="section-text">
              Với hơn 3 năm làm việc trong ngành, mình đã tham gia vào nhiều dự
              án từ web app đến hệ thống backend, có kinh nghiệm làm việc với
              nhiều công nghệ khác nhau và hiểu rõ quy trình phát triển phần mềm
              chuyên nghiệp. Mình luôn đề cao tính
              <strong>hiệu quả</strong>, <strong>bảo trì</strong> và
              <strong>trải nghiệm người dùng</strong>
              trong mỗi dòng code.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sở thích Section -->
    <section class="hobbies-section">
      <div class="container">
        <div class="content-wrapper">
          <div class="text-content">
            <h2 class="section-title">Sở thích</h2>
            <ul class="hobbies-list">
              <li>⚽ Đá bóng cùng bạn bè</li>
              <li>🎮 Chơi Liên Minh Huyền Thoại</li>
              <li>♟️ Đấu trí với Cờ tướng</li>
              <li>🛵 Đi phượt khám phá những vùng đất mới</li>
              <li>🎸 Gảy vài bản nhạc trên cây đàn guitar</li>
              <li>🎧 Thư giãn cùng âm nhạc</li>
              <li>📚 Đọc sách để mở rộng kiến thức và tư duy</li>
            </ul>
          </div>
          <div class="image-content">
            <img
              :src="`/images/default.jpeg`"
              alt="Sở thích của Dương Thảo"
              class="section-image"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Quan điểm sống Section -->
    <section class="philosophy-section">
      <div class="container">
        <div class="content-wrapper reverse">
          <div class="image-content">
            <img
              :src="`/images/default.jpeg`"
              alt="Quan điểm sống"
              class="section-image"
            />
          </div>
          <div class="text-content">
            <h2 class="section-title">Quan điểm sống</h2>
            <p class="section-text">
              Mình tin rằng sự phát triển không bao giờ có điểm dừng. Dù là công
              việc hay cuộc sống, chỉ cần <strong>liên tục học hỏi</strong>,
              <strong>không ngại thay đổi</strong>, mình sẽ từng bước tiến gần
              hơn đến những mục tiêu lớn hơn.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta tags
useHead({
  title: 'About Me - Dương Thảo',
  meta: [
    {
      name: 'description',
      content:
        'Tìm hiểu về Dương Thảo - Software Engineer với hơn 3 năm kinh nghiệm trong phát triển phần mềm',
    },
    {
      property: 'og:title',
      content: 'About Me - Dương Thảo',
    },
    {
      property: 'og:description',
      content: 'Software Engineer đam mê công nghệ và không ngừng học hỏi',
    },
  ],
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.about-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  width: 80%;
  margin: 0 auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

section {
  padding: 60px 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.content-wrapper.reverse {
  grid-template-columns: 1fr 1fr;
}

.content-wrapper.reverse .image-content {
  order: -1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #2c3e50;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.section-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.hobbies-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hobbies-list li {
  font-size: 1.1rem;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.hobbies-list li:hover {
  padding-left: 20px;
  color: #667eea;
}

.hobbies-list li:last-child {
  border-bottom: none;
}

.section-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.section-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

/* Section specific backgrounds */
.intro-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.experience-section {
  background: #fff;
}

.hobbies-section {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.philosophy-section {
  background: #fff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper,
  .content-wrapper.reverse {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .content-wrapper.reverse .image-content {
    order: 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-image {
    height: 300px;
  }

  section {
    padding: 40px 0;
  }

  .container {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }

  .intro-text,
  .section-text {
    font-size: 1rem;
  }

  .hobbies-list li {
    font-size: 1rem;
  }

  .section-image {
    height: 250px;
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-wrapper {
  animation: fadeInUp 0.6s ease-out;
}
</style>
