<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['messageEvent']}}</div>
        <div class="panelBody">
            <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>{{i18n['messageEvent.message']}}：</div>
                <a-select style="width:90%; font-size: 12px"
                           :placeholder="i18n['messageEvent.message']"
                           :value="model.message"
                           :disabled="readOnly"
                           @change="(e) => { onChange('message', e) }">
                    <a-option v-for="message in messageDefs" :key="message.id" :label="message.name" :value="message.id" />
                </a-select>
            </div>
        </div>
    </div>
</template>
<script>
  import DefaultDetail from "./DefaultDetail";
  export default {
    inject: ['i18n'],
    components: {
      DefaultDetail
    },
    props: {
      model: {
        type:Object,
        default: ()=>({}),
      },
      onChange: {
        type: Function,
        default: ()=>{}
      },
      readOnly:{
        type: Boolean,
        default: false,
      },
      messageDefs: {
        type: Array,
        default: ()=>([]),
      },
    },
  }
</script>
