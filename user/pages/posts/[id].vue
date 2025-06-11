<!-- pages/post/[id].vue -->
<template>
  <div class="post-page">
    <!-- Loading state -->
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Đang tải bài viết...</p>
    </div>

    <!-- Error state -->
    <!-- <div v-else-if="error" class="error">
      <h2>Không tìm thấy bài viết</h2>
      <p>{{ error.message }}</p>
      <NuxtLink to="/" class="btn btn-back">← Quay lại trang chủ</NuxtLink>
    </div> -->

    <!-- Post content -->
    <div v-else-if="post">
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.created_at) }}</span>
          <!-- <span class="post-author">{{ post.author }}</span> -->
          <span v-if="post.category" class="post-category">{{
            post.category.name
          }}</span>
        </div>
      </div>

      <!-- Featured image and description -->
      <div v-if="post.featured_image || post.description" class="post-featured">
        <!-- <div v-if="post.image_url" class="post-image">
          <img :src="post.featured_image" :alt="post.title" />
        </div> -->
        <div class="post-image">
          <img :src="`/images/docker.jpg`" :alt="post.title" />
        </div>
        <div v-if="post.description" class="post-description">
          <p>{{ post.description }}</p>
        </div>
      </div>

      <div class="post-content">
        <div class="ckeditor-content" v-html="post.content"></div>
      </div>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length" class="post-tags">
        <span class="tag-label">Tags:</span>
        <span v-for="tag in post.tags" :key="tag" class="tag">
          {{ tag.name }}
        </span>
      </div>

      <div class="post-navigation">
        <NuxtLink to="/posts" class="btn btn-back">
          ← Danh sách bài viết
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const postStore = usePostStore()
const route = useRoute()
const post = ref({})
const urlPath = window.location.pathname
const idFromUrl = urlPath.split('/').pop()
const postId = route.params.id ?? idFromUrl

onMounted(async () => {
  // Kiểm tra postId có tồn tại không
  if (!postId) {
    console.error('No post ID provided')
    return
  }

  try {
    post.value = await postStore.getPostById(postId)
    console.log('Loaded post:', post.value) // Debug log
  } catch (err) {
    console.error('Error fetching post:', err)
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// SEO meta tags
useHead(() => ({
  title: post.value?.title
    ? `${post.value.title} - My Blog`
    : 'Bài viết - My Blog',
  meta: [
    {
      name: 'description',
      content: post.value?.excerpt || 'Nội dung bài viết từ CKEditor',
    },
    {
      property: 'og:title',
      content: post.value?.title || 'Bài viết',
    },
    {
      property: 'og:description',
      content: post.value?.excerpt || 'Nội dung bài viết từ CKEditor',
    },
  ],
}))

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Handle error 404
// if (error && error.value?.statusCode === 404) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Không tìm thấy bài viết'
//   })
// }
</script>

<style scoped>
.posts-section {
  padding: 6rem 0;
  background: #f8fafc;
}
.post-page {
  width: 60%;
  /* max-width: 800px; */
  margin: 0 auto;
  padding: 2rem 1rem;
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
  width: 40px;
  height: 40px;
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
}

.error h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.post-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1.5rem;
}

.post-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.post-meta > span {
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  border-radius: 20px;
  font-weight: 500;
}

.post-category {
  background-color: #3b82f6 !important;
  color: white !important;
}

.post-featured {
  margin-bottom: 2rem;
}

.post-image {
  margin-bottom: 1.5rem;
}

.post-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
  box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.2);
  display: block;
}

.post-description {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.post-description p {
  margin: 0;
  font-size: 1.1rem;
  color: #4b5563;
  font-style: italic;
  line-height: 1.6;
}

.post-content {
  margin-bottom: 2rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
}

.tag-label {
  font-weight: 600;
  color: #4b5563;
}

.tag {
  background-color: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* CKEditor content styles - same as previous */
.ckeditor-content {
  line-height: 1.7;
  color: #374151;
}

.ckeditor-content :deep(h1),
.ckeditor-content :deep(h2),
.ckeditor-content :deep(h3),
.ckeditor-content :deep(h4),
.ckeditor-content :deep(h5),
.ckeditor-content :deep(h6) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #1f2937;
}

.ckeditor-content :deep(h2) {
  font-size: 1.875rem;
}
.ckeditor-content :deep(h3) {
  font-size: 1.5rem;
}

.ckeditor-content :deep(p) {
  margin-bottom: 1rem;
  text-align: justify;
}

.ckeditor-content :deep(ul),
.ckeditor-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.ckeditor-content :deep(li) {
  margin-bottom: 0.5rem;
}

.ckeditor-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid #3b82f6;
  background-color: #f8fafc;
  font-style: italic;
}

.ckeditor-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.post-navigation {
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.btn-back {
  background-color: #6b7280;
}

.btn-back:hover {
  background-color: #4b5563;
}

/* Responsive */
@media (max-width: 768px) {
  .post-page {
    padding: 1rem 0.5rem;
    width: 95%;
  }

  .post-title {
    font-size: 2rem;
  }

  .post-meta {
    justify-content: center;
  }

  .post-tags {
    justify-content: center;
  }

  .post-image img {
    max-height: 250px;
  }

  .post-description {
    padding: 1rem;
  }

  .post-description p {
    font-size: 1rem;
  }
}
</style>
