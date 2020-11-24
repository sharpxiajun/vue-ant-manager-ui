<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <template  v-for="menu in initMenus">
          <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.path">
            <span slot="title">{{menu.meta.name}}</span>
            <a-menu-item v-for="childMenu in menu.children" :key="childMenu.path">
              {{childMenu.meta.name}}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item :key="menu.path" v-else>
            {{menu.meta.name}}
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <template  v-for="menu in initMenus">
            <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.path">
              <span slot="title">{{menu.meta.name}}</span>
              <a-menu-item v-for="childMenu in menu.children" :key="childMenu.path">
                {{childMenu.meta.name}}
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item :key="menu.path" v-else>
              {{menu.meta.name}}
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <transition name="fadeinLeft" mode="out-in">
            <router-view></router-view>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
  export default {
    name: 'layout',
    data() {
      return {
        collapsed: false
      }
    },
    computed: {
      initMenus() {
        return this.$router.options.routes[0].children
      }
    },
    created() {
      
    },
    mounted() {
      console.log('initMenus:', this.initMenus)
    },
    methods: {
    }
  }
</script>

<style lang="less">
  .layout {
    .logo {
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px 28px 16px 0;
      float: left;
    }
  }
</style>