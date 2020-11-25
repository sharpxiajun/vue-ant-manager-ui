<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">
        <img :src="require('@/assets/img/skin-blue/logo.png')"/>
        <div class="title">
          <span>Vue AntD UI</span>
        </div>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="topActiveMenu"
        :style="{ lineHeight: '64px' }"
      >
        <template  v-for="menu in initMenus">
          <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.path">
            <span slot="title">{{menu.meta.name}}</span>
            <a-menu-item v-for="childMenu in menu.children" :key="childMenu.path" @click="menuClick">
              {{childMenu.meta.name}}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item :key="menu.path" @click="menuClick" v-else>
            {{menu.meta.name}}
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200">
        <a-menu
          mode="inline"
          :default-selected-keys="leftActiveMenu"
          :default-open-keys="['/adus']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <template  v-for="menu in initMenus">
            <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.path">
              <span slot="title">{{menu.meta.name}}</span>
              <a-menu-item v-for="childMenu in menu.children" :key="childMenu.path" @click="menuClick">
                {{childMenu.meta.name}}
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item :key="menu.path" @click="menuClick" v-else>
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
          <transition name="fadeinleft" mode="out-in">
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
        collapsed: false,
        topActiveMenu: ['/home'],
        leftActiveMenu: ['/home']
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
      menuClick(menu) {
        this.$router.push(menu.key)
        this.topActiveMenu = menu.keyPath
        this.leftActiveMenu = menu.keyPath
      }
    }
  }
</script>

<style lang="less" scoped>
  .layout {
    .logo {
      width: 200px;
      height: 64px;
      line-height: 60px;
      background-color: transparent;
      float: left;
      align-items: center;
      margin-left: 10px;
      display: flex;
      img {
        width: 40px;
        height: 40px;
      }
      .title {
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: #fff;
          font-size: 24px;
        }
      }
    }
  }
</style>