<template>
  <div>
    <main class="main-content">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <h1 class="page-title">Danh sách bài viết</h1>
          <p class="page-subtitle">
            Khám phá những bài viết thú vị của chúng tôi
          </p>
        </div>

        <!-- Search and Filter -->
        <div class="search-filter">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm bài viết..."
              class="search-input"
            />
            <button class="search-btn" @click="searchKeyword()">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
          <div class="filter-box">
            <select
              v-model="selectedCategory"
              class="filter-select"
              @change="filterCategory()"
            >
              <div
                v-for="(category, index) in categoryStore.categoryList"
                :key="index"
              >
                <option :value="category.id">{{ category.name }}</option>
              </div>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="loading">
          <div class="spinner"></div>
          <p>Đang tải bài viết...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error">
          <h3>Có lỗi xảy ra</h3>
          <p>{{ error.message }}</p>
          <button class="retry-btn" @click="refresh()">Thử lại</button>
        </div>

        <!-- Posts Grid -->
        <div v-else class="posts-grid">
          <article
            v-for="post in postStore.postList"
            :key="post.id"
            class="post-card"
          >
            <!-- Post Image -->
            <div class="post-image">
              <img
                :src="post.image_url || '/images/default.jpeg'"
                :alt="post.title"
                loading="lazy"
              />
              <div class="post-category">{{ post.category.name }}</div>
            </div>

            <!-- Post Content -->
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">
                  <i class="fas fa-calendar"></i>
                  {{ formatDate(post.created_at) }}
                </span>
                <!-- <span class="post-author">{{ post.author }}</span> -->
              </div>

              <h2 class="post-title">
                <NuxtLink :to="`/posts/${post.id}`">
                  {{ truncateText(post.title, 50) }}
                </NuxtLink>
              </h2>

              <p class="post-excerpt">
                {{ truncateText(post.description, 70) }}
              </p>

              <!-- Tags -->
              <div v-if="post.tags && post.tags.length" class="post-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">
                  {{ tag.name }}
                </span>
              </div>

              <div class="post-actions">
                <NuxtLink :to="`/posts/${post.id}`" class="read-more">
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

        <!-- Empty State -->
        <div
          v-if="!pending && !error && paginationData.meta.total === 0"
          class="empty-state"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
          <h3>Không tìm thấy bài viết nào</h3>
          <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>

        <!-- Pagination -->
        <div v-if="paginationData.meta.total > 1" class="pagination">
          <button
            :disabled="paginationData.currentPage === 1"
            class="pagination-btn"
            @click="changePage(paginationData.currentPage - 1)"
          >
            Trước
          </button>

          <span
            v-for="page in paginationRange"
            :key="page"
            class="pagination-item"
            :class="{ active: page === paginationData.currentPage }"
            @click="changePage(page)"
          >
            {{ page }}
          </span>

          <button
            :disabled="paginationData.currentPage === paginationData.meta.total"
            class="pagination-btn"
            @click="changePage(paginationData.currentPage + 1)"
          >
            Sau
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const categoryStore = useCategoryStore()
const postStore = usePostStore()

// Pagination
const paginationData = reactive({
  currentPage: 1,
  perPage: 6,
  lastPage: 1,
  meta: { total: 0 },
})

const paginationRange = ref([])

// SEO Meta
useHead({
  title: 'Danh sách bài viết - My Blog',
  meta: [
    {
      name: 'description',
      content:
        'Khám phá những bài viết thú vị về công nghệ, lập trình và nhiều chủ đề khác.',
    },
    { property: 'og:title', content: 'Danh sách bài viết - My Blog' },
    {
      property: 'og:description',
      content:
        'Khám phá những bài viết thú vị về công nghệ, lập trình và nhiều chủ đề khác.',
    },
  ],
})
onMounted(async () => {
  await categoryStore.getCategoryList()
  const response = await postStore.getPostList()
  const result = response.data

  handlePagination(result)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// create arow function to handle pagination
const handlePagination = (result) => {
  paginationData.meta.total = result.meta.total
  paginationData.currentPage = result.meta.current_page
  paginationData.perPage = result.meta.per_page
  paginationData.lastPage = result.meta.last_page

  const range = []
  const start = Math.max(1, paginationData.currentPage - 2)
  const end = Math.min(paginationData.lastPage, paginationData.currentPage + 2)
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  paginationRange.value = range
}

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref(null)

const pending = ref(false)
const error = ref(null)
const refresh = () => {
  // Nếu muốn làm gì đó khi "refresh", bạn có thể định nghĩa logic ở đây
  console.log('Refresh called')
}

const searchKeyword = async (page = 1) => {
  await handlePost(1)
}

const filterCategory = async () => {
  await handlePost(1)
}

const handlePost = async (page) => {
  pending.value = true
  try {
    const response = await postStore.getPostList({
      page: page,
      keyword: searchQuery.value,
      category_id: selectedCategory.value,
    })
    const result = response.data

    handlePagination(result)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    error.value = err
    console.log('Error fetching posts:', err)
  } finally {
    pending.value = false
  }
}

// Methods
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)

  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const changePage = async (page) => {
  await handlePost(page)
}

onUnmounted(() => {
  categoryStore.resetStore()
})

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
</script>

<style scoped>
.main-content {
  min-height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.search-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.search-btn:hover {
  background: #2563eb;
  transform: translateY(-50%) scale(1.05);
}

.filter-box {
  min-width: 200px;
}

.filter-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error {
  text-align: center;
  padding: 3rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 1rem;
  color: #dc2626;
}

.retry-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s;
}

.retry-btn:hover {
  background: #b91c1c;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
  /* hover: transform: translateY(-5px); */
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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
  transition: transform 0.3s;
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.post-content {
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.post-title {
  margin-bottom: 1rem;
}

.post-title a {
  color: #1f2937;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  transition: color 0.3s;
}

.post-title a:hover {
  color: #3b82f6;
}

.post-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: #6b7280;
}

.empty-state svg {
  margin-bottom: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination-btn {
  padding: 0.75rem 1rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-item {
  padding: 0.75rem;
  min-width: 2.5rem;
  text-align: center;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-item:hover {
  background: #f3f4f6;
}

.pagination-item.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .search-filter {
    flex-direction: column;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .post-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
