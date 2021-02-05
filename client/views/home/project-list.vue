<template>
  <section class="project-list">
    <div class="project-list-main">
      <Card
        class="project-list-item mb-10"
        v-for="(item, index) in pages[pageNo]"
        :key="index"
        :data="item"
      ></Card>
      <div
        class="project-list-item mb-10"
        v-if="pageNo === 0 && pages[pageNo].length <= 2"
      >
        <div class="join-more">
          <img
            width="96"
            height="87"
            src="~@/assets/images/home/join-more.png"
            alt="加入更多"
          />
          <p class="mt-10">申请加入更多项目空间吧！</p>
          <a-button type="link" @click="$emit('joinMore')">加入更多</a-button>
        </div>
      </div>
    </div>
    <div class="project-list-pagenation">
      <span
        v-for="item in pages.length"
        :class="item - 1 === pageNo && 'is-active'"
        :key="item"
        @click="changePageNo(item - 1)"
      ></span>
    </div>
  </section>
</template>
<script>
import Card from './project-card'
import { getProjectList } from '@/api/common'
export default {
  name: 'ProjectList',
  components: {
    Card
  },
  data() {
    return {
      prjList: [],
      pageNo: 0,
      pageSize: 3,
      pages: [[]]
    }
  },
  created() {
    this.getPrjList()
  },
  watch: {
    prjList: {
      handler(val) {
        this.processPageData()
      },
      immediate: true
    }
  },
  methods: {
    async getPrjList() {
      const res = await this.$simpleAsyncTo(getProjectList(), '获取项目的列表失败')
      if (res) this.prjList = res.data
    },
    changePageNo(pageNo) {
      this.pageNo = pageNo
    },
    processPageData() {
      const pages = [], len = this.prjList.length
      if (len <= 3) {
        pages.push(this.prjList)
      } else {
        let pageNo = 0
        pages[pageNo] = []
        this.prjList.map((item, index) => {
          if (pages[pageNo].length >= this.pageSize) {
            pageNo++
            pages[pageNo] = []
          }
          pages[pageNo].push(item)         
        })
        this.pages = pages
      }
    }
  }
}
</script>
<style lang="less" scoped>
.project-list {
  &-main {
    height: calc(~'100% - 20px');
    display: flex;
    flex-direction: column;
  }

  &-item {
    height: calc(~'33.33% - 10px');
  }
  .join-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-height: 130px;
  }
  &-pagenation {
    height: 20px;
    text-align: right;

    span {
      display: inline-block;
      width: 16px;
      height: 4px;
      margin-left: 2px;
      transform: skew(-30deg);
      background: @gray5;
      transition: all 0.2s linear;
      cursor: pointer;

      &.is-active {
        background: @primary-color;
      }

      &:hover {
        transform: skew(-30deg) scale(1.1);
      }
    }
  }
}
</style>