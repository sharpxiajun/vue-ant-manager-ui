/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-04 20:42:20 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 23:42:44
 */
<template>
  <section class="home">
    <transition name="fadeinleft" mode="out-in" >
      <div class="home-wrapper flex-layout">
        <div class="flex-column home-left mr-10">
          <div class="brief mb-15">
            <p>欢迎进入</p>
            <h3>Antv Manager</h3>
          </div>
          <div class="flex-1 workspace flex-column">
            <div class="title">
              工作空间
              <div class="add-more" @click="visibleSpaceDrawer = true">
                加入更多
                <a-icon type="plus" />
              </div>
            </div>
            <ProjectList
              class="flex-1"
              @joinMore="visibleSpaceDrawer = true"
            ></ProjectList>
          </div>
        </div>
        <div class="flex-column flex-1 home-center mr-10"></div>
        <div class="flex-column home-right"></div>   
      </div>
    </transition>
  </section>
</template>
<script>
import ProjectList from './project-list'
export default {
  name: 'Home',
  mixins: [],
  components: {
    ProjectList
  },
  data() {
    return {
      visibleSpaceDrawer: false
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/less/var.less';
.home {
  overflow-y: auto;
  .home-wrapper {
    height: 100%;
    min-height: 660px;
    padding: 0px;

    .home-left {
      width: 14.5%;
      min-width: 244px;
    }
    .home-right {
      flex-basis: 380px;
      min-width: 380px;
      .case-report {
        display: flex;
        flex-direction: column;
        .reportTop {
          // flex: 1;
        }
        .reportBottom {
          flex: 1;
        }
      }
    }

    > .flex-column {
      height: 100%;
      > [class^='flex-'],
      > [class*=' flex-'] {
        padding: 12px;
      }

      .add-more {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14px;

        &:hover {
          cursor: pointer;
        }
      }

      .center-main {
        padding: 0;
        position: relative;

        .more-btn {
          cursor: pointer;
          margin-top: 8px;
          padding: 0 15px;
        }
      }

      > div {
        background-color: @gray8;
      }

      .brief {
        height: 180px;
        // background-color: @geekblue-10;
        background-color: #130d3e;
        background-image: url('~@/assets/images/home/home.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        p {
          margin-left: 15px;
          margin-top: 10px;
          font-size: 16px;
          color: @shadow-secondary-text;
        }
        h3 {
          margin-left: 15px;
          margin-top: 5px;
          color: @shadow-primary;
          font-size: 18px;
          font-weight: bold;
        }
      }

      .flex-column {
        .title {
          font-size: @title-size;
          color: @gray1;
          margin-bottom: 10px;
          position: relative;
        }
        .content {
          flex: 1;
        }
      }
    }
  }
}
</style>