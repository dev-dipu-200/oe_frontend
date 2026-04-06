<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="oe-fixed oe-inset-0 oe-z-50 oe-overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="oe-absolute oe-inset-0 oe-overflow-hidden">
        <div
          class="oe-absolute oe-inset-0 oe-bg-gray-500 oe-bg-opacity-75 oe-transition-opacity"
          aria-hidden="true"
          @click="close"
        ></div>

        <div class="oe-fixed oe-inset-y-0 oe-right-0 oe-pl-10 oe-max-w-1/6 oe-flex">
          <div
            class="oe-w-screen oe-max-w-sm oe-transform oe-transition oe-ease-in-out oe-duration-500"
            :class="isOpen ? 'oe-translate-x-0' : 'oe-translate-x-full'"
          >
            <div class="oe-h-full oe-flex oe-flex-col oe-bg-white oe-shadow-xl oe-overflow-y-scroll">
              <div class="oe-px-4 oe-py-6 oe-sm:px-6 oe-bg-gray-50 oe-border-b oe-border-gray-200">
                <div class="oe-flex oe-items-start oe-justify-between">
                  <h2 class="oe-text-lg oe-font-medium oe-text-gray-900" id="slide-over-title">
                    Filters
                  </h2>
                  <div class="oe-ml-3 oe-h-7 oe-flex oe-items-center">
                    <button
                      type="button"
                      class="oe-bg-white oe-rounded-md oe-text-gray-400 hover:oe-text-gray-500 focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-indigo-500"
                      @click="close"
                    >
                      <span class="oe-sr-only">Close panel</span>
                      <svg class="oe-h-6 oe-w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="oe-relative oe-flex-1 oe-px-4 oe-py-6 oe-sm:px-6">
                <form @submit.prevent="applyFilters" class="oe-space-y-6">
                  <div>
                    <label for="keyword" class="oe-block oe-text-sm oe-font-medium oe-text-gray-700">Keyword</label>
                    <div class="oe-mt-1">
                      <input
                        type="text"
                        id="keyword"
                        v-model="filters.keyword"
                        class="oe-shadow-sm focus:oe-ring-indigo-500 focus:oe-border-indigo-500 oe-block oe-w-full oe-sm:text-sm oe-border-gray-300 oe-rounded-md oe-p-2 oe-border"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                  <div class="oe-grid oe-grid-cols-2 oe-gap-4">
                    <div>
                      <label for="from_date" class="oe-block oe-text-sm oe-font-medium oe-text-gray-700">From Date</label>
                      <div class="oe-mt-1">
                        <input
                          type="date"
                          id="from_date"
                          v-model="filters.from_date"
                          class="oe-shadow-sm focus:oe-ring-indigo-500 focus:oe-border-indigo-500 oe-block oe-w-full oe-sm:text-sm oe-border-gray-300 oe-rounded-md oe-p-2 oe-border"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="to_date" class="oe-block oe-text-sm oe-font-medium oe-text-gray-700">To Date</label>
                      <div class="oe-mt-1">
                        <input
                          type="date"
                          id="to_date"
                          v-model="filters.to_date"
                          class="oe-shadow-sm focus:oe-ring-indigo-500 focus:oe-border-indigo-500 oe-block oe-w-full oe-sm:text-sm oe-border-gray-300 oe-rounded-md oe-p-2 oe-border"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="oe-flex oe-items-center">
                    <input
                      id="is_paginate"
                      type="checkbox"
                      v-model="filters.is_paginate"
                      class="oe-h-4 oe-w-4 oe-text-indigo-600 focus:oe-ring-indigo-500 oe-border-gray-300 oe-rounded"
                    />
                    <label for="is_paginate" class="oe-ml-2 oe-block oe-text-sm oe-text-gray-900">
                      Enable Pagination
                    </label>
                  </div>

                  <div v-if="filters.is_paginate" class="oe-grid oe-grid-cols-2 oe-gap-4">
                    <div>
                      <label for="page" class="oe-block oe-text-sm oe-font-medium oe-text-gray-700">Page</label>
                      <div class="oe-mt-1">
                        <input
                          type="number"
                          id="page"
                          v-model="filters.page"
                          min="1"
                          class="oe-shadow-sm focus:oe-ring-indigo-500 focus:oe-border-indigo-500 oe-block oe-w-full oe-sm:text-sm oe-border-gray-300 oe-rounded-md oe-p-2 oe-border"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="page_size" class="oe-block oe-text-sm oe-font-medium oe-text-gray-700">Page Size</label>
                      <div class="oe-mt-1">
                        <select
                          id="page_size"
                          v-model="filters.page_size"
                          class="oe-mt-1 oe-block oe-w-full oe-pl-3 oe-pr-10 oe-py-2 oe-text-base oe-border-gray-300 focus:oe-outline-none focus:oe-ring-indigo-500 focus:oe-border-indigo-500 oe-sm:text-sm oe-rounded-md oe-border"
                        >
                          <option :value="10">10</option>
                          <option :value="20">20</option>
                          <option :value="50">50</option>
                          <option :value="100">100</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Footer -->
              <div class="oe-flex-shrink-0 oe-px-4 oe-py-4 oe-flex oe-justify-end oe-gap-3 oe-bg-gray-50 oe-border-t oe-border-gray-200">
                <button
                  type="button"
                  class="oe-bg-white oe-py-2 oe-px-4 oe-border oe-border-gray-300 oe-rounded-md oe-shadow-sm oe-text-sm oe-font-medium oe-text-gray-700 hover:oe-bg-gray-50"
                  @click="resetFilters"
                >
                  Reset
                </button>
                <button
                  type="button"
                  class="oe-bg-white oe-py-2 oe-px-4 oe-border oe-border-gray-300 oe-rounded-md oe-shadow-sm oe-text-sm oe-font-medium oe-text-gray-700 hover:oe-bg-gray-50"
                  @click="close"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="oe-inline-flex oe-justify-center oe-py-2 oe-px-4 oe-border oe-border-transparent oe-shadow-sm oe-text-sm oe-font-medium oe-rounded-md oe-text-white oe-bg-indigo-600 hover:oe-bg-indigo-700"
                  @click="applyFilters"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface FilterPayload {
  keyword?: string;
  from_date?: string;
  to_date?: string;
  is_paginate: boolean;
  page?: number;
  page_size?: number;
}

const props = defineProps<{
  isOpen: boolean;
  initialFilters?: Partial<FilterPayload>;
}>();

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
  (e: 'filter', payload: Record<string, any>): void;
  (e: 'reset'): void;
}>();

const filters = ref({
  keyword: props.initialFilters?.keyword || '',
  from_date: props.initialFilters?.from_date || '',
  to_date: props.initialFilters?.to_date || '',
  is_paginate: props.initialFilters?.is_paginate ?? true,
  page: props.initialFilters?.page || 1,
  page_size: props.initialFilters?.page_size || 10,
});

watch(() => props.initialFilters, (newVal) => {
  if (newVal) {
    filters.value = {
      keyword: newVal.keyword || '',
      from_date: newVal.from_date || '',
      to_date: newVal.to_date || '',
      is_paginate: newVal.is_paginate ?? true,
      page: newVal.page || 1,
      page_size: newVal.page_size || 10,
    };
  }
}, { deep: true });

const close = () => {
  emit('update:isOpen', false);
};

const buildFilterPayload = (): Record<string, any> => {
  const payload: Record<string, any> = {};
  if (filters.value.keyword?.trim()) {
    payload.keyword = filters.value.keyword.trim();
  }
  if (filters.value.from_date) {
    payload.from_date = filters.value.from_date;
  }
  if (filters.value.to_date) {
    payload.to_date = filters.value.to_date;
  }
  payload.is_paginate = Boolean(filters.value.is_paginate);
  if (payload.is_paginate) {
    payload.page = Number(filters.value.page) || 1;
    payload.page_size = Number(filters.value.page_size) || 10;
  }

  return payload;
};

const applyFilters = () => {
  const payload = buildFilterPayload();
  emit('filter', payload);
  close();
};

const resetFilters = () => {
  filters.value = {
    keyword: '',
    from_date: '',
    to_date: '',
    is_paginate: true,
    page: 1,
    page_size: 10,
  };
  emit('reset');
};
</script>

<style scoped>
.oe-translate-x-full { transform: translateX(100%); }
.oe-translate-x-0 { transform: translateX(0); }
</style>