<template>
  <div class="home-page">
    <!-- Slider Section -->
    <section class="slider-section">
      <div class="slider-container">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
        >
          <img :src="slide.image" :alt="slide.title" />
          <div class="slide-overlay">
            <div class="container">
              <div class="slide-content">
                <h1 class="slide-title">{{ slide.title }}</h1>
                <p class="slide-description">{{ slide.description }}</p>
                <div class="slide-actions">
                  <button class="btn btn-primary" @click="scrollToPosts">
                    <i class="fas fa-book-open"></i>
                    Khám phá bài viết
                  </button>
                  <button class="btn btn-outline" @click="scrollToAbout">
                    <i class="fas fa-user"></i>
                    Tìm hiểu về tôi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Navigation -->
        <div class="slider-nav">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            class="nav-dot"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></button>
        </div>

        <!-- Slider Arrows -->
        <button class="slider-arrow prev" @click="prevSlide">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="slider-arrow next" @click="nextSlide">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>

    <!-- Latest Posts Section -->
    <section ref="postsSection" class="posts-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Bài viết mới nhất</h2>
          <p class="section-description">
            Khám phá những bài viết và hướng dẫn mới nhất về lập trình và công
            nghệ
          </p>
        </div>

        <div class="posts-grid">
          <article
            v-for="post in latestPosts"
            :key="post.id"
            class="post-card"
            @click="viewPost(post)"
          >
            <div class="post-image">
              <img :src="`/images/default.jpeg`" :alt="post.title" />
              <div class="post-category">{{ post.category.name }}</div>
            </div>
            <div class="post-content">
              <h3 class="post-title">
                {{ truncateText(post.title, 50) }}
              </h3>
              <p class="post-excerpt">
                {{ truncateText(post.description, 70) }}
              </p>
              <div class="post-meta">
                <span class="post-date">
                  <i class="fas fa-calendar"></i>
                  {{ formatDate(post.created_at) }}
                </span>
                <!-- <span class="post-read-time">
                  <i class="fas fa-clock"></i>
                  {{ post.readTime }} phút đọc
                </span> -->
              </div>
              <div v-if="post.tags && post.tags.length" class="post-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">
                  {{ tag.name }}
                </span>
              </div>
              <div class="post-actions">
                <NuxtLink
                  :to="{ name: 'posts-id', params: { id: post.id } }"
                  class="read-more"
                >
                  Đọc tiếp
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
                <div class="post-stats">
                  <span class="views">{{ post.view_count || 0 }} lượt xem</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="section-footer">
          <button class="btn btn-outline" @click="viewAllPosts">
            Xem tất cả bài viết
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section ref="aboutSection" class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="about-title">Về tôi</h2>
            <p class="about-description">
              Xin chào! Tôi là Cloudy, một lập trình viên đam mê chia sẻ kiến
              thức. Với hơn {{ yearsOfExperience }} năm kinh nghiệm trong lĩnh
              vực phát triển web, tôi luôn tìm kiếm những công nghệ và phương
              pháp mới để cải thiện kỹ năng lập trình.
            </p>
            <div class="skills-tags">
              <span v-for="skill in skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
            <button class="btn btn-primary" @click="learnMore">
              Tìm hiểu thêm về tôi
            </button>
          </div>
          <div class="about-image">
            <div class="profile-card">
              <div class="profile-avatar">
                <i class="fas fa-user-circle"></i>
              </div>
              <div class="profile-info">
                <h4>Cloudy</h4>
                <p>Full-stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'default',
  data() {
    return {
      currentSlide: 0,
      slideInterval: null,
      slides: [
        {
          image:
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600',
          title: 'Chào mừng đến với Blog - Cloudy',
          description:
            'Chia sẻ kiến thức về lập trình, công nghệ và cuộc sống. Cùng nhau học hỏi và phát triển mỗi ngày.',
        },
        {
          image:
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
          title: 'Khám Phá Công Nghệ Mới',
          description:
            'Cập nhật những xu hướng công nghệ mới nhất và các framework hiện đại trong phát triển web.',
        },
        {
          image:
            'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop',
          title: 'Học Hỏi Cùng Nhau',
          description:
            'Tham gia cộng đồng lập trình viên, chia sẻ kinh nghiệm và cùng nhau tiến bộ từng ngày.',
        },
      ],
      latestPosts: [
        // {
        //   id: 1,
        //   title: 'Hướng dẫn Vue.js 3 từ cơ bản đến nâng cao',
        //   excerpt:
        //     'Tìm hiểu về Vue.js 3 với Composition API, Teleport và những tính năng mới...',
        //   image: 'https://placehold.co/600x400',
        //   category: 'Vue.js',
        //   date: new Date('2025-05-15'),
        //   readTime: 8,
        // },
        // {
        //   id: 2,
        //   title: 'JavaScript ES2024: Những tính năng mới nên biết',
        //   excerpt:
        //     'Khám phá các tính năng mới nhất của JavaScript ES2024 và cách áp dụng...',
        //   image: 'https://placehold.co/600x400',
        //   category: 'JavaScript',
        //   date: new Date('2025-05-10'),
        //   readTime: 6,
        // },
        // {
        //   id: 3,
        //   title: 'Xây dựng API RESTful với Node.js và Express',
        //   excerpt:
        //     'Hướng dẫn chi tiết cách xây dựng một API RESTful hoàn chỉnh...',
        //   image: 'https://placehold.co/400',
        //   category: 'Node.js',
        //   date: new Date('2025-05-05'),
        //   readTime: 12,
        // },
      ],
      skills: ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Python', 'Docker'],
      yearsOfExperience: 5,
    }
  },
  head() {
    return {
      title: 'Trang chủ - Blog Cloudy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Blog chia sẻ kiến thức về lập trình, công nghệ và cuộc sống bởi Cloudy',
        },
      ],
    }
  },
  mounted() {
    this.startSlideShow()
    this.getPostsByCategories()
  },
  beforeUnmount() {
    this.stopSlideShow()
  },
  methods: {
    startSlideShow() {
      this.slideInterval = setInterval(() => {
        this.nextSlide()
      }, 5000) // Chuyển slide mỗi 5 giây
    },
    stopSlideShow() {
      if (this.slideInterval) {
        clearInterval(this.slideInterval)
        this.slideInterval = null
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    prevSlide() {
      this.currentSlide =
        this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1
    },
    goToSlide(index) {
      this.currentSlide = index
      // Reset timer khi user click vào dot
      this.stopSlideShow()
      this.startSlideShow()
    },
    scrollToPosts() {
      this.$refs.postsSection?.scrollIntoView({
        behavior: 'smooth',
      })
    },
    scrollToAbout() {
      this.$refs.aboutSection?.scrollIntoView({
        behavior: 'smooth',
      })
    },
    viewPost(post) {
      console.log('View post:', post.id)
      this.$router.push('/posts/' + post.id)
    },
    viewAllPosts() {
      this.$router.push('/posts')
    },
    learnMore() {
      // Redirect to about page
      this.$router.push('/about')
    },
    formatDate(dateString) {
      const date = new Date(dateString)

      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    truncateText(text, maxLength) {
      if (!text) return ''
      return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text
    },
    async getPostsByCategories() {
      const postStore = usePostStore()
      this.latestPosts = await postStore.getPostsByCategories()
    },
  },
}
</script>

<style scoped>
.home-page {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Slider Section */
.slider-section {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-content {
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 2rem;
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-description {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.slide-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Slider Navigation */
.slider-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: white;
  transform: scale(1.2);
}

.nav-dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* Slider Arrows */
.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;
}

.slider-arrow:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.slider-arrow.prev {
  left: 2rem;
}

.slider-arrow.next {
  right: 2rem;
}

.slider-arrow i {
  font-size: 1.2rem;
}

/* Posts Section */
.posts-section {
  padding: 6rem 0;
  background: #f8fafc;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.post-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.post-content {
  padding: 2rem;
}

.post-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.post-excerpt {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  color: #94a3b8;
  font-size: 0.9rem;
}

.post-meta i {
  margin-right: 0.5rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.tag {
  background: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.read-more:hover {
  color: #2563eb;
  gap: 0.75rem;
}

.post-stats {
  font-size: 0.875rem;
  color: #9ca3af;
}

.section-footer {
  text-align: center;
}

/* About Section */
.about-section {
  padding: 6rem 0;
  background: white;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
}

.about-description {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.skill-tag {
  background: #eff6ff;
  color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.profile-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
}

.profile-avatar {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.profile-info h4 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.profile-info p {
  opacity: 0.9;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.btn-outline {
  background: #3b82f6;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.btn-outline:hover {
  background: #3b82f6;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .slider-section {
    height: 500px;
  }

  .slide-title {
    font-size: 2.5rem;
  }

  .slide-description {
    font-size: 1.1rem;
  }

  .slide-actions {
    flex-direction: column;
    align-items: center;
  }

  .slider-arrow {
    width: 40px;
    height: 40px;
  }

  .slider-arrow.prev {
    left: 1rem;
  }

  .slider-arrow.next {
    right: 1rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .slide-content {
    padding: 1rem;
  }

  .slide-title {
    font-size: 2rem;
  }

  .slide-description {
    font-size: 1rem;
  }

  .btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
