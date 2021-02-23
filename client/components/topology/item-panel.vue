<template>
  <div class="itemPanel" :style="{'height': height+'px'}">
    <a-collapse v-model="activeNames">
      <a-collapse-panel key="0" header="网管SVG">
        <img data-item="{clazz:'netDisk',size:'50*50',label:''}"
              :src="require('./assets/net/disk.svg')" style="width:42px;height:42px" />
        <div>硬盘SVG</div>
        <img data-item="{clazz:'netRack',size:'50*50',label:''}"
              :src="require('./assets/net/rack.svg')" style="width:42px;height:42px" />
        <div>机架SVG</div>
        <img data-item="{clazz:'netCard',size:'50*50',label:''}"
              :src="require('./assets/net/netcard.svg')" style="width:42px;height:42px" />
        <div>网卡SVG</div>
        <img data-item="{clazz:'netServer',size:'50*50',label:''}"
              :src="require('./assets/net/server.svg')" style="width:42px;height:42px" />
        <div>服务器SVG</div>
        <img data-item="{clazz:'netServer1',size:'50*50',label:''}"
              :src="require('./assets/net/server1.svg')" style="width:42px;height:42px" />
        <div>服务器1SVG</div>        
      </a-collapse-panel>
      <a-collapse-panel key="1" header="网管IMG">
        <img data-item="{clazz:'netDisk',size:'50*50',label:''}"
              :src="require('./assets/net/disk-img.png')" style="width:42px;height:42px" />
        <div>硬盘IMG</div>
        <img data-item="{clazz:'netRack1',size:'50*50',label:''}"
              :src="require('./assets/net/netRack-img.png')" style="width:42px;height:42px" />
        <div>机架IMG</div>
        <img data-item="{clazz:'netWorkCard1',size:'50*50',label:''}"
              :src="require('./assets/net/netcard-img.png')" style="width:42px;height:42px" />
        <div>网卡IMG</div>
        <img data-item="{clazz:'netServer2',size:'50*50',label:''}"
              :src="require('./assets/net/server1-img.png')" style="width:42px;height:42px" />
        <div>服务器IMG</div>
        <img data-item="{clazz:'netServer3',size:'50*50',label:''}"
              :src="require('./assets/net/server-img.png')" style="width:42px;height:42px" />
        <div>服务器1IMG</div>        
      </a-collapse-panel>             
      <a-collapse-panel key="2" header="开始事件">
        <img data-item="{clazz:'start',size:'30*30',label:''}"
              :src="require('./assets/flow/start.svg')" style="width:42px;height:42px" />
        <div>开始节点</div>
        <img data-item="{clazz:'timerStart',size:'30*30',label:''}"
              :src="require('./assets/flow/timer-start.svg')" style="width:42px;height:42px" />
        <div>定时节点</div>
        <img data-item="{clazz:'messageStart',size:'30*30',label:''}"
              :src="require('./assets/flow/message-start.svg')" style="width:42px;height:42px" />
        <div>消息节点</div>
        <img data-item="{clazz:'signalStart',size:'30*30',label:''}"
              :src="require('./assets/flow/signal-start.svg')" style="width:42px;height:42px" />
        <div>信号节点</div>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="活动">
        <img :data-item="userTaskData"
              :src="require('./assets/flow/user-task.svg')" style="width:80px;height:44px" />
        <div>审批节点</div>
        <img :data-item="scriptTaskData"
              :src="require('./assets/flow/script-task.svg')" style="width:80px;height:44px" />
        <div>脚本节点</div>
        <img :data-item="javaTaskData"
              :src="require('./assets/flow/java-task.svg')" style="width:80px;height:44px" />
        <div>自定义类节点</div>
        <img :data-item="mailTaskData"
              :src="require('./assets/flow/mail-task.svg')" style="width:80px;height:44px" />
        <div>邮件节点</div>
        <img :data-item="receiveTaskData"
              :src="require('./assets/flow/receive-task.svg')" style="width:80px;height:44px" />
        <div>接收节点</div>       
      </a-collapse-panel>
      <a-collapse-panel header="网关" key="4">
        <img data-item="{clazz:'exclusiveGateway',size:'40*40',label:''}"
              :src="require('./assets/flow/exclusive-gateway.svg')" style="width:48px;height:48px" />
        <div>排他网关</div>
        <img data-item="{clazz:'parallelGateway',size:'40*40',label:''}"
              :src="require('./assets/flow/parallel-gateway.svg')" style="width:48px;height:48px" />
        <div>并行网关</div>
        <img data-item="{clazz:'inclusiveGateway',size:'40*40',label:''}"
              :src="require('./assets/flow/inclusive-gateway.svg')" style="width:48px;height:48px" />
        <div>包容网关</div>
      </a-collapse-panel>
      <a-collapse-panel header="捕获事件" key="5">
        <img data-item="{clazz:'timerCatch',size:'50*30',label:''}"
              :src="require('./assets/flow/timer-catch.svg')" style="width:58px;height:38px" />
        <div>定时节点</div>
        <img data-item="{clazz:'messageCatch',size:'50*30',label:''}"
              :src="require('./assets/flow/message-catch.svg')" style="width:58px;height:38px" />
        <div>消息节点</div>
        <img data-item="{clazz:'signalCatch',size:'50*30',label:''}"
              :src="require('./assets/flow/signal-catch.svg')" style="width:58px;height:38px" />
        <div>信号节点</div>
      </a-collapse-panel>
      <a-collapse-panel header="结束事件" name="6">
          <img data-item="{clazz:'end',size:'30*30',label:''}"
                :src="require('./assets/flow/end.svg')" style="width:42px;height:42px" />
          <div>结束节点</div>
      </a-collapse-panel>    
    </a-collapse>
  </div>
</template>
<script>
export default {
  name: 'item-panel',
  props: {
    height: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      activeNames: ['0', '1', '2', '3', '4', '5', '6'],
      userTaskData: "{clazz:'userTask',size:'80*44',label:'审批节点'}",
      scriptTaskData: "{clazz:'scriptTask',size:'80*44',label:'脚本节点'}",
      javaTaskData: "{clazz:'javaTask',size:'80*44',label:'自定义类节点'}",
      mailTaskData: "{clazz:'mailTask',size:'80*44',label:'邮件节点'}",
      receiveTaskData: "{clazz:'receiveTask',size:'80*44',label:'接收节点'}",
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
  .itemPanel {
    float: left;
    position: absolute;
    top: 50px;
    left: 0px;
    width: 10%;
    background: #f0f2f5;
    overflow-y: auto;
    border-left: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    img{
        width: 92px;
        height: 96px;
        padding: 4px;
        border: 1px solid rgba(0,0,0,0);
        border-radius: 2px;
        &:hover{
            border: 1px solid #ccc;
            cursor: move;
        }
    }
    /deep/ .act-collapse {
      .act-collapse-item {
        .act-collapse-content  {
          .act-collapse-content-box {
            border-top: 0;
            background: #fff;
            text-align: center;            
          }
        }
      }
    }
  }
</style>