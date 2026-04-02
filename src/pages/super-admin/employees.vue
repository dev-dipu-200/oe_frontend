<template>
  <EmployeeManagement
    title="HR Employee Management"
    description="Create, review, and update employee records for onboarding, workforce planning, and reporting alignment."
    endpoint-base="/super-admin/employees"
  />
</template>

<script setup lang="ts">
import EmployeeManagement from '@/components/EmployeeManagement.vue'
</script>
