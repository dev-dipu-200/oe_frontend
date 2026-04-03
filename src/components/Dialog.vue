<template>
  <Teleport to="body">
    <Transition
      enter-active-class="oe-transition-opacity oe-duration-300 oe-ease-out"
      enter-from-class="oe-opacity-0"
      enter-to-class="oe-opacity-100"
      leave-active-class="oe-transition-opacity oe-duration-200 oe-ease-in"
      leave-from-class="oe-opacity-100"
      leave-to-class="oe-opacity-0"
    >
      <div
        v-if="modelValue"
        class="oe-fixed oe-inset-0 oe-z-[100] oe-overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="oe-fixed oe-inset-0 oe-bg-slate-900/40 oe-backdrop-blur-[2px]"
          @click="handleBackdropClick"
        ></div>

        <!-- Dialog Container -->
        <div
          class="oe-flex oe-min-h-full oe-items-center oe-justify-center oe-p-4 oe-text-center sm:oe-p-6"
        >
          <Transition
            enter-active-class="oe-transition-all oe-duration-300 oe-ease-out"
            enter-from-class="oe-opacity-0 oe-scale-95 oe-translate-y-4"
            enter-to-class="oe-opacity-100 oe-scale-100 oe-translate-y-0"
            leave-active-class="oe-transition-all oe-duration-200 oe-ease-in"
            leave-from-class="oe-opacity-100 oe-scale-100 oe-translate-y-0"
            leave-to-class="oe-opacity-0 oe-scale-95 oe-translate-y-4"
          >
            <div
              v-if="modelValue"
              class="oe-relative oe-w-full oe-transform oe-overflow-hidden oe-rounded-[2rem] oe-bg-white oe-text-left oe-shadow-2xl oe-transition-all"
              :class="maxWidthClass"
            >
              <!-- Header -->
              <div
                class="oe-flex oe-items-center oe-justify-between oe-border-b oe-border-slate-100 oe-p-6"
              >
                <slot name="header">
                  <h3
                    class="oe-text-xl oe-font-semibold oe-leading-6 oe-text-slate-900"
                  >
                    {{ title }}
                  </h3>
                </slot>
                <button
                  @click="close"
                  type="button"
                  class="oe-rounded-xl oe-p-2 oe-text-slate-400 hover:oe-bg-slate-100 hover:oe-text-slate-600 oe-transition-colors focus:oe-outline-none"
                >
                  <span class="oe-sr-only">Close</span>
                  <svg
                    class="oe-h-6 oe-w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div class="oe-p-6">
                <slot></slot>
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                class="oe-flex oe-items-center oe-justify-end oe-gap-3 oe-border-t oe-border-slate-100 oe-p-6"
              >
                <slot name="footer"></slot>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Dialog Title",
  },
  maxWidth: {
    type: String,
    default: "md",
    validator: (value: string) =>
      [
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ].includes(value),
  },
  persistent: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleBackdropClick = () => {
  if (!props.persistent) {
    close();
  }
};

const maxWidthClass = computed(() => {
  const classes: Record<string, string> = {
    sm: "oe-max-w-sm",
    md: "oe-max-w-md",
    lg: "oe-max-w-lg",
    xl: "oe-max-w-xl",
    "2xl": "oe-max-w-2xl",
    "3xl": "oe-max-w-3xl",
    "4xl": "oe-max-w-4xl",
    "5xl": "oe-max-w-5xl",
    "6xl": "oe-max-w-6xl",
    "7xl": "oe-max-w-7xl",
  };
  return classes[props.maxWidth] || "oe-max-w-md";
});

// Handle Escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.modelValue && !props.persistent) {
    close();
  }
};

// Prevent body scroll when open
watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = "";
});
</script>
