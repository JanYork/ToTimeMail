<template>
  <div class="time_top_box">
    <h1>云寄 • 时光邮局</h1>
    <p>见证时光的交错，与未来相遇</p>
  </div>
  <img id="h_img_logo" src="../static/ico/timelogo.png"  alt="logo"/>
  <div class="time_context">
    <div class="time_context_top">
      <p>“用一生去抵达遥远的未来”</p>
      <p class="timeText">—— 与时同行</p>
    </div>

    <div class="time_context_info">
      <CellGroup inset class="gell_group">
        <Field v-model="data.form.title" label="邮件标题" placeholder="输入标题" />

        <Field v-model="data.form.title" label="实体信件" name="switch" >
          <template #input>
          <Switch v-model="data.form.type" size="20" :inactive-value="0" :active-value="1" />
          </template>
        </Field>

        <Field
            is-link
            readonly
            name="area"
            label="选择地区"
            placeholder="点击选择省市区"
            @click="data.showArea = true"
        />

        <Popup v-model:show="data.showArea" position="bottom">
          <Area
              :area-list="data.area"
              @confirm="onConfirm"
              @cancel="data.showArea = false"
              :columns-num=3
              :columns-placeholder="['请选择', '请选择', '请选择']"
          />
        </Popup>

        <Field
            v-model="data.addressDetailed"
            label="详细地址"
            placeholder="详细地址"
            maxlength="35"

            rows="1"
            autosize
            type="textarea"
        />
      </CellGroup>
    </div>
  </div>
</template>

<script setup>
import "../static/css/media.css";
import Button from 'vant/es/button/index';
import 'vant/es/button/style/index';
import CellGroup from 'vant/es/cell-group/index';
import 'vant/es/cell-group/style/index';
import Field from 'vant/es/field/index';
import 'vant/es/field/style/index';
import Switch from 'vant/es/switch/index';
import 'vant/es/switch/style/index';
import Popup from 'vant/es/popup/index';
import 'vant/es/popup/style/index';
import Area from 'vant/es/area/index';
import 'vant/es/area/style/index';
import { areaList } from '@vant/area-data';

import {onMounted, reactive} from "vue";

const data = reactive({
  showArea: false,
  area: areaList,
  addressDetailed: '',
  addressArea: '',
  form: {
    title: "",
    // 类型
    type: 0,
    //获取现在时间
    dataTime: new Date(),
    isTa: 1,
    toEmail: "",
    addressee: "",
    phone: "",
    content: "",
    contentHtml: "",
    isHtml: 0,
    isPublic: 1,
    isAbandon: 1,
    address: "",
  },
});
const onConfirm = (values) => {
  data.addressArea = values[0].name + values[1].name + values[2].name;
};
</script>

<style scoped>
@import url('../static/css/emailMobile.css');
</style>