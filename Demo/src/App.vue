<template>
  <t-config-provider :global-config="globalConfig">
  <router-view ></router-view>
</t-config-provider>
</template>

<script setup>
  import merge from 'lodash/merge';
  import enConfig from 'tdesign-vue-next/es/locale/en_US';
  
  // 全局特性配置，引入英文语言配置包 enConfig
  const globalConfig = merge(enConfig, {
    // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
    calendar: {},
    table: {},
    pagination: {},
  });
  </script>