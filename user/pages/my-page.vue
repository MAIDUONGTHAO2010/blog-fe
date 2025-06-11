<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow-lg">
        <div class="p-6">
          <h1 class="text-xl font-bold text-gray-800 mb-6">Quản lý Admin</h1>
          <nav class="space-y-2">
            <button
              v-for="item in navItems"
              :key="item.id"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100',
              ]"
              @click="setActiveTab(item.id)"
            >
              <span>{{ item.icon }}</span>
              <span class="font-medium">{{ item.label }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-8">
        <!-- Categories Section -->
        <div v-if="activeTab === 'categories'" class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-800">Quản lý Categories</h2>
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              @click="openEditModal(null, 'categories')"
            >
              <Icon name="ph:plus" />
              Tạo mới
            </button>
          </div>

          <div class="bg-white rounded-lg shadow-sm border">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mô tả
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Số bài viết
                    </th>
                    <th
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="category in categories"
                    :key="category.id"
                    class="hover:bg-gray-50"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
                    >
                      {{ category.name }}
                    </td>
                    <td class="px-6 py-4 text-gray-600">
                      {{ category.description }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                        >{{ category.postCount }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        class="text-blue-600 hover:text-blue-800 mr-3 p-1"
                        @click="openEditModal(category, 'categories')"
                      >
                        <Icon name="ph:pencil" />
                      </button>
                      <button
                        class="text-red-600 hover:text-red-800 p-1"
                        @click="deleteItem(category.id, 'categories')"
                      >
                        <Icon name="ph:trash" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tags Section -->
        <div v-if="activeTab === 'tags'" class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-800">Quản lý Tags</h2>
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              @click="openEditModal(null, 'tags')"
            >
              <Icon name="ph:plus" />
              Tạo mới
            </button>
          </div>

          <div class="bg-white rounded-lg shadow-sm border">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Màu sắc
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Số bài viết
                    </th>
                    <th
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="tag in tags"
                    :key="tag.id"
                    class="hover:bg-gray-50"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
                    >
                      {{ tag.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-2">
                        <div
                          class="w-4 h-4 rounded-full border"
                          :style="{ backgroundColor: tag.color }"
                        ></div>
                        <span class="text-sm text-gray-600">{{
                          tag.color
                        }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
                        >{{ tag.postCount }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        class="text-blue-600 hover:text-blue-800 mr-3 p-1"
                        @click="openEditModal(tag, 'tags')"
                      >
                        <Icon name="ph:pencil" />
                      </button>
                      <button
                        class="text-red-600 hover:text-red-800 p-1"
                        @click="deleteItem(tag.id, 'tags')"
                      >
                        <Icon name="ph:trash" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Posts Section -->
        <div v-if="activeTab === 'posts'" class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-800">Quản lý Posts</h2>
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              @click="openEditModal(null, 'posts')"
            >
              <Icon name="ph:plus" />
              Tạo mới
            </button>
          </div>

          <!-- Search -->
          <div class="bg-white p-4 rounded-lg shadow-sm border">
            <div class="relative">
              <Icon
                name="ph:magnifying-glass"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Tìm kiếm bài viết..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="currentPage = 1"
              />
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tiêu đề
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lượt xem
                    </th>
                    <th
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="post in currentPosts"
                    :key="post.id"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {{ post.title }}
                    </td>
                    <td class="px-6 py-4 text-gray-600">{{ post.category }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2 py-1 rounded-full text-sm',
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800',
                        ]"
                      >
                        {{
                          post.status === 'published'
                            ? 'Đã xuất bản'
                            : 'Bản nháp'
                        }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                      {{ post.date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                      {{ post.views.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        class="text-blue-600 hover:text-blue-800 mr-3 p-1"
                        @click="openEditModal(post, 'posts')"
                      >
                        <Icon name="ph:pencil" />
                      </button>
                      <button
                        class="text-red-600 hover:text-red-800 p-1"
                        @click="deleteItem(post.id, 'posts')"
                      >
                        <Icon name="ph:trash" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div
              class="px-6 py-3 border-t bg-gray-50 flex items-center justify-between"
            >
              <div class="text-sm text-gray-700">
                Hiển thị {{ (currentPage - 1) * postsPerPage + 1 }} -
                {{ Math.min(currentPage * postsPerPage, filteredPosts.length) }}
                trong {{ filteredPosts.length }} bài viết
              </div>
              <div class="flex items-center gap-2">
                <button
                  :disabled="currentPage === 1"
                  class="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  @click="currentPage = Math.max(1, currentPage - 1)"
                >
                  <Icon name="ph:caret-left" />
                </button>
                <span class="px-3 py-1 bg-blue-600 text-white rounded">
                  {{ currentPage }}
                </span>
                <span class="text-gray-500">/ {{ totalPages }}</span>
                <button
                  :disabled="currentPage === totalPages"
                  class="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                >
                  <Icon name="ph:caret-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">
            {{ editingItem ? 'Chỉnh sửa' : 'Tạo mới' }}
            {{
              activeTab === 'categories'
                ? 'Category'
                : activeTab === 'tags'
                  ? 'Tag'
                  : 'Post'
            }}
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600"
            @click="closeEditModal"
          >
            <Icon name="ph:x" />
          </button>
        </div>

        <div class="space-y-4">
          <!-- Category Form -->
          <template v-if="activeTab === 'categories'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Tên Category</label
              >
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Mô tả</label
              >
              <textarea
                v-model="formData.description"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              ></textarea>
            </div>
          </template>

          <!-- Tag Form -->
          <template v-if="activeTab === 'tags'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Tên Tag</label
              >
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Màu sắc</label
              >
              <input
                v-model="formData.color"
                type="color"
                class="w-full h-10 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </template>

          <!-- Post Form -->
          <template v-if="activeTab === 'posts'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Tiêu đề</label
              >
              <input
                v-model="formData.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Category</label
              >
              <input
                v-model="formData.category"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Trạng thái</label
              >
              <select
                v-model="formData.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Đã xuất bản</option>
              </select>
            </div>
          </template>

          <div class="flex gap-3 mt-6">
            <button
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              @click="saveItem"
            >
              Lưu
            </button>
            <button
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
              @click="closeEditModal"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Định nghĩa metadata cho page
definePageMeta({
  title: 'Quản lý Admin',
  layout: 'admin',
})

// Reactive data
const activeTab = ref('posts')
const showEditModal = ref(false)
const editingItem = ref(null)
const currentPage = ref(1)
const searchTerm = ref('')
const postsPerPage = 5

// Form data
const formData = ref({})

// Navigation items
const navItems = [
  { id: 'categories', label: 'Categories', icon: '📁' },
  { id: 'tags', label: 'Tags', icon: '🏷️' },
  { id: 'posts', label: 'Posts', icon: '📝' },
]

// Sample data - trong thực tế sẽ fetch từ API
const categories = ref([
  {
    id: 1,
    name: 'Công nghệ',
    description: 'Các bài viết về công nghệ',
    postCount: 15,
  },
  { id: 2, name: 'Du lịch', description: 'Kinh nghiệm du lịch', postCount: 8 },
  { id: 3, name: 'Ẩm thực', description: 'Món ăn ngon', postCount: 12 },
])

const tags = ref([
  { id: 1, name: 'JavaScript', color: '#3b82f6', postCount: 20 },
  { id: 2, name: 'React', color: '#10b981', postCount: 15 },
  { id: 3, name: 'Vue.js', color: '#8b5cf6', postCount: 10 },
  { id: 4, name: 'Travel', color: '#f59e0b', postCount: 8 },
  { id: 5, name: 'Food', color: '#ef4444', postCount: 12 },
])

const posts = ref([
  {
    id: 1,
    title: 'Hướng dẫn Vue.js cơ bản',
    category: 'Công nghệ',
    status: 'published',
    date: '2024-12-01',
    views: 1200,
  },
  {
    id: 2,
    title: 'Du lịch Đà Nẵng 3 ngày 2 đêm',
    category: 'Du lịch',
    status: 'draft',
    date: '2024-11-28',
    views: 850,
  },
  {
    id: 3,
    title: 'Cách làm phở bò ngon',
    category: 'Ẩm thực',
    status: 'published',
    date: '2024-11-25',
    views: 2100,
  },
  {
    id: 4,
    title: 'React Hooks nâng cao',
    category: 'Công nghệ',
    status: 'published',
    date: '2024-11-20',
    views: 1800,
  },
  {
    id: 5,
    title: 'Khám phá Hội An cổ kính',
    category: 'Du lịch',
    status: 'published',
    date: '2024-11-15',
    views: 950,
  },
  {
    id: 6,
    title: 'Bánh mì Việt Nam',
    category: 'Ẩm thực',
    status: 'draft',
    date: '2024-11-10',
    views: 650,
  },
  {
    id: 7,
    title: 'TypeScript cho người mới bắt đầu',
    category: 'Công nghệ',
    status: 'published',
    date: '2024-11-05',
    views: 1400,
  },
  {
    id: 8,
    title: 'Sapa mùa lúa chín',
    category: 'Du lịch',
    status: 'published',
    date: '2024-10-30',
    views: 1100,
  },
])

// Computed properties
const filteredPosts = computed(() => {
  return posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

// Methods
const setActiveTab = (tab) => {
  activeTab.value = tab
  currentPage.value = 1
  searchTerm.value = ''
}

const openEditModal = (item, type) => {
  editingItem.value = item
  showEditModal.value = true

  // Initialize form data based on type
  if (type === 'categories') {
    formData.value = {
      name: item?.name || '',
      description: item?.description || '',
    }
  } else if (type === 'tags') {
    formData.value = {
      name: item?.name || '',
      color: item?.color || '#3b82f6',
    }
  } else if (type === 'posts') {
    formData.value = {
      title: item?.title || '',
      category: item?.category || '',
      status: item?.status || 'draft',
    }
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
  formData.value = {}
}

const saveItem = () => {
  if (activeTab.value === 'categories') {
    if (editingItem.value) {
      // Update existing category
      const index = categories.value.findIndex(
        (cat) => cat.id === editingItem.value.id,
      )
      if (index !== -1) {
        categories.value[index] = {
          ...categories.value[index],
          ...formData.value,
        }
      }
    } else {
      // Create new category
      const newId = Math.max(...categories.value.map((c) => c.id)) + 1
      categories.value.push({ id: newId, postCount: 0, ...formData.value })
    }
  } else if (activeTab.value === 'tags') {
    if (editingItem.value) {
      // Update existing tag
      const index = tags.value.findIndex(
        (tag) => tag.id === editingItem.value.id,
      )
      if (index !== -1) {
        tags.value[index] = { ...tags.value[index], ...formData.value }
      }
    } else {
      // Create new tag
      const newId = Math.max(...tags.value.map((t) => t.id)) + 1
      tags.value.push({ id: newId, postCount: 0, ...formData.value })
    }
  } else if (activeTab.value === 'posts') {
    if (editingItem.value) {
      // Update existing post
      const index = posts.value.findIndex(
        (post) => post.id === editingItem.value.id,
      )
      if (index !== -1) {
        posts.value[index] = { ...posts.value[index], ...formData.value }
      }
    } else {
      // Create new post
      const newId = Math.max(...posts.value.map((p) => p.id)) + 1
      const now = new Date()
      posts.value.push({
        id: newId,
        date: now.toISOString().split('T')[0],
        views: 0,
        ...formData.value,
      })
    }
  }

  closeEditModal()
}

const deleteItem = (id, type) => {
  if (confirm('Bạn có chắc chắn muốn xóa?')) {
    if (type === 'categories') {
      categories.value = categories.value.filter((cat) => cat.id !== id)
    } else if (type === 'tags') {
      tags.value = tags.value.filter((tag) => tag.id !== id)
    } else if (type === 'posts') {
      posts.value = posts.value.filter((post) => post.id !== id)
    }
  }
}

// Watch for search term changes to reset pagination
watch(searchTerm, () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Custom styles nếu cần */
.table-container {
  min-height: 400px;
}
</style>
