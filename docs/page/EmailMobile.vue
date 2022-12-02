<template>
  <div id="container">
    <div class="time_top_context">
      <div class="time_top_box">
        <h1>云寄 • 时光邮局</h1>
        <p>见证时光的交错，与未来相遇</p>
      </div>
    </div>
    <img src="../static/ico/logo-.png" alt="logo" class="back_logo"/>
    <div class="time_context">
      <div class="time_context_top">
        <p>“用一生去抵达遥远的未来”</p>
        <p class="timeText">—— 与时同行</p>
      </div>

      <div class="time_context_info">
        <CellGroup inset class="gell_group">
          <Field v-model="data.form.title" label="邮件标题" placeholder="输入标题"/>

          <Field label="实体信件" name="switch">
            <template #input>
              <Switch v-model="data.form.type" size="20" :inactive-value="0" :active-value="1"/>
            </template>
          </Field>

          <Field v-model="data.form.addressee" label="收件姓名" placeholder="收件姓名" :disabled="data.isDisabled"/>


          <Field v-model="data.form.phone" label="联系手机" placeholder="联系手机" :disabled="data.isDisabled"/>

          <Field
              is-link
              readonly
              name="area"
              label="选择地区"
              placeholder="点击选择省市区"
              @click="isShowArea"
              :disabled="data.isDisabled"
              v-model="data.addressArea"
          />

          <Popup v-model:show="data.showArea" position="bottom" :style="{ height: '85%' }">
              <Area
                  :area-list="data.area"
                  @confirm="onConfirmArea"
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
              autosize
              :disabled="data.isDisabled"
          />

          <Field
              is-link
              readonly
              name="editor"
              label="撰写信件"
              placeholder="开始撰写"
              @click="data.showEditor = true"
          />

          <Field label="是否公开" name="switch">
            <template #input>
              <Switch v-model="data.form.isPublic" size="20" :inactive-value="1" :active-value="0"/>
            </template>
          </Field>

          <Popup
              v-model:show="data.showEditor"
              round
              position="bottom"
              :style="{ height: '85%' }">
            <Editor/>
          </Popup>

          <Field
              is-link
              readonly
              name="dataTime"
              label="选择未来"
              placeholder="未来时间"
              v-model="data.date"
              @click="openDataShow"
          />

          <Calendar :min-date="data.minDate" :max-date="data.maxDate" v-model:show="data.dataShow"
                    @confirm="onConfirmData" :show-confirm="false"/>

          <Field label="写给他人" name="switch">
            <template #input>
              <Switch v-model="data.form.isTa" size="20" :inactive-value="1" :active-value="0"/>
            </template>
          </Field>

          <Field class="__code_email" v-model="data.form.codeMail" label="收验邮箱" placeholder="验证邮箱"
                 v-show="data.form.isTa == 0"/>


          <Field v-model="data.form.toEmail" label="收件邮箱" :placeholder="data.emailPlaceholder"/>

          <Field
              v-model="data.form.code"
              center
              clearable
              label="验证码"
              placeholder="请输入验证码"
          >
            <template #button>
              <span id="getCode" @click="getCode" :style="data.spanColor">{{ data.getCode }}</span>
            </template>
          </Field>

          <Field v-model="data.isAgreeTerms" label="同意条款" name="switch">
            <template #input>
              默认同意
              <span style="color: #5B9CFC;" @click="textBoxUp">《隐私条款》</span>
            </template>
          </Field>

          <Popup
              v-model:show="data.showTextBoxUp"
              round
              position="bottom"
              :style="{ height: '85%' }">
            <iframe src="/PrivacyPolicy.html" frameborder="0" width="100%" height="100%"></iframe>
          </Popup>
        </CellGroup>

        <div class="button_box">
          <Button class="but" type="primary" @click="toEmail">投递信件</Button>
          <Button class="but" type="default" @click="outEmail">放弃信件</Button>
        </div>
      </div>

      <Popup
          v-model:show="data.isQQbrw"
          closeable
          close-icon="close"
          position="bottom"
          :style="{ height: '50%' }"
      >
        <div class="qq_box">
          <img src="../static/ico/timelogo.png" alt="logo">
          <h2 class="qq_title">云寄•时光邮局</h2>
          <p>云寄检测到为您目前为QQ内置浏览器</p>
          <p>为了更好的体验，请使用外置浏览器</p>
        </div>
      </Popup>
    </div>
  </div>

  <!-- 全局遮罩 -->
  <Overlay id="Masking" :show="data.isMasking">
    <Loading id="load" color="#1989fa" size="24px" vertical>
      云寄时光机正在穿越时空...
    </Loading>
  </Overlay>
</template>

<script setup>
import Editor from '../component/Editor.vue'

import "../static/css/media.css";
import CellGroup from 'vant/es/cell-group/index';
import Field from 'vant/es/field/index';
import Switch from 'vant/es/switch/index';
import Popup from 'vant/es/popup/index';
import Area from 'vant/es/area/index';
import Calendar from 'vant/es/calendar/index';
import Button from 'vant/es/button/index';
import Notify from 'vant/es/notify/index';
import Loading from 'vant/es/loading/index';
import Overlay from 'vant/es/overlay/index';
import Toast from 'vant/es/toast/index';
import Dialog from 'vant/es/dialog/index';
import Vditor from "vditor";
import getUA from "../utils/getUA"
import 'animate.css';


import {areaList} from '@vant/area-data';

import {onMounted, reactive, watch} from "vue";
import http from "../utils/http/http";
import ToTimeConfig from "../config/ToTime.config";

const data = reactive({
  isDisabled: true,
  showEditor: false,
  showArea: false,
  dataShow: false,
  showTextBoxUp: false,
  isQQbrw: false,
  emailPlaceholder: '收信邮箱',
  isAgreeTerms: 1,
  isMasking: false,
  getCode: '获取验证',
  area: areaList,
  addressDetailed: '',
  addressArea: '',
  date: '',
  spanColor: 'color: #418aed;',
  minDate: new Date(),
  maxDate: new Date(2099, 12, 31),
  form: {
    title: "",
    // 类型
    type: 0,
    //获取现在时间
    dataTime: "",
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
    code: "",
    codeMail: "",
  },
});

watch(
    () => data.form.type,
    (val) => {
      data.isDisabled = val !== 1;
    },
    {deep: true}
);
watch(
    () => data.addressDetailed,
    (val) => {
      data.form.address = data.addressArea + val;
    },
    {deep: true}
);
watch(
    () => data.form.isTa,
    (val) => {
      if (val === 1) {
        data.emailPlaceholder = '收信邮箱';
      } else {
        data.emailPlaceholder = 'TA的邮箱';
      }
    },
    {deep: true}
);

//进入页面检查是否为镜像
onMounted(() => {
  if (ToTimeConfig.isCopy) {
    Dialog.confirm({
      message:
          '此为云寄镜像站点，是否跳转到官方站点？',
    }).then(() => {
      window.location.href = ToTimeConfig.official;
    }).catch(() => {
      console.log('取消跳转');
    });
  }
  if (getUA().QQbrw) {
    setTimeout(() => {
      data.isQQbrw = true;
    }, 1000);
  }
});

const onConfirmArea = (values) => {
  data.addressArea = values[0].name + values[1].name + values[2].name;
  if (data.addressDetailed !== '') {
    data.form.address = data.addressArea + data.addressDetailed;
  }
  data.showArea = false;
};

const openDataShow = () => {
  data.dataShow = true;
};

const outEmail = async () => {
  let formIsAll = true;
  //TODO: 此处判断其实可以被优化，抽取出来
  let editorVar = localStorage.getItem("vditorvditor");
  if (editorVar.replace(/[\n\s]/g, "") === "") {
    formIsAll = false;
  }
  //将editorVar中的内容
  data.form.content = editorVar;
  await Vditor.md2html(editorVar).then((html) => {
    data.form.contentHtml = html;
  });

  if (data.form.title == "") {
    formIsAll = false;
  }
  if (data.form.content == "" || data.form.content == "\n") {
    formIsAll = false;
  }
  if (!data.isAgreeTerms) {
    formIsAll = false;
  }
  if (data.form.toEmail == "") {
    formIsAll = false;
  }
  //匹配邮箱
  if (!/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(data.form.toEmail)) {
    formIsAll = false;
  }
  if (data.form.dataTime == "") {
    formIsAll = false;
  }
  if (data.form.type == 1) {
    if (data.form.addressee == "") {
      formIsAll = false;
    }
    if (data.form.phone == "") {
      formIsAll = false;
    }
    if (data.addressArea == "") {
      formIsAll = false;
    }
    if (data.addressDetailed == "") {
      formIsAll = false;
    }
    //判断数据格式
    if (!/^1[3456789]\d{9}$/.test(data.form.phone)) {
      formIsAll = false;
    }

    if (!/^[\u4e00-\u9fa5]{2,4}$/.test(data.form.addressee)) {
      formIsAll = false;
    }
  }

  if (formIsAll) {
    Dialog.confirm({
      message:
          '貌似你的信件信息齐全了，是否需要我们帮你存档？以后可以找小简要回数据哦~',
    }).then(() => {
      data.form.isAbandon = 0;
      data.isMasking = true;
      http.post("/timeMail/add", data.form).then((res) => {
        if (res.data.code === 200) {
          setTimeout(() => {
            data.isMasking = false;
            Toast.success('存档成功，有需要找小简哦~');
          }, 2000);
        } else {
          setTimeout(() => {
            data.isMasking = false;
            Toast.fail('存档失败，请稍后再试');
          }, 2000);
          if (res.data.msg) {
            Notify({type: 'danger', message: res.data.msg});
          }
        }
      });
    }).catch(() => {
      //刷新
      window.location.reload();
    });
  } else {
    Dialog.confirm({
      message: '确定要放弃这封信吗？有什么心事可以和小简说哟~，有时间可以聊天哦~',
    }).then(() => {
      Notify({type: 'primary', message: '很遗憾呢，期待你下次再来哦~'});
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch(() => {
      Notify({type: 'primary', message: '请继续填写哦~'});
    });
  }
};
const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const onConfirmData = (values) => {
  data.dataShow = false;
  data.date = formatDate(values);
  data.form.dataTime = values;
};

const getCode = async () => {
  let codeEmail;
  if (data.form.isTa == 0) {
    codeEmail = data.form.codeMail;
  } else {
    codeEmail = data.form.toEmail;
  }
  if (codeEmail === '') {
    Notify({type: 'danger', message: '请先填写邮箱'});
    return;
  }
  //匹配邮箱
  if (!/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(codeEmail)) {
    Notify({type: 'warning', message: '请输入正确的邮箱'});
    return;
  }
  await http.get('/code/get', {
    email: codeEmail,
  }).then(res => {
    if (res.data.code === 200) {
      data.spanColor = '';
      Notify({type: 'success', message: '验证码已发送'});
      //开始倒计时
      let time = 120;
      let timer = setInterval(() => {
        time--;
        data.getCode = time + 's';
        if (time === 0) {
          clearInterval(timer);
          data.getCode = '获取验证码';
        }
      }, 1000);
    } else {
      Notify({type: 'danger', message: res.data.msg});
    }
  });
}

const textBoxUp = () => {
  data.showTextBoxUp = true;
};
const isShowArea = () => {
  if (data.isDisabled) {
    Notify({type: 'warning', message: '无需选择'});
    return;
  }
  data.showArea = true;
};


const toEmail = async () => {

  let editorVar = localStorage.getItem("vditorvditor");
  if (editorVar.replace(/[\n\s]/g, "") === "") {
    Notify({type: 'warning', message: '信件内容不能为空'});
    return;
  }
  //将editorVar中的内容
  data.form.content = editorVar;
  await Vditor.md2html(editorVar).then((html) => {
    data.form.contentHtml = html;
  });

  if (data.form.title == "") {
    Notify({type: 'warning', message: '请输入标题'});
    return;
  }
  if (data.form.content == "" || data.form.content == "\n") {
    Notify({type: 'warning', message: '请输入内容'});
    return;
  }
  if (!data.isAgreeTerms) {
    Notify({type: 'warning', message: '请同意隐私条款'});
    return;
  }
  if (data.form.toEmail == "") {
    Notify({type: 'warning', message: '请输入收件邮箱'});
    return;
  }
  //匹配邮箱
  if (!/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(data.form.toEmail)) {
    Notify({type: 'warning', message: '请输入正确的邮箱'});
    return;
  }
  if (data.form.dataTime == "") {
    Notify({type: 'warning', message: '请选择投递时间'});
    return;
  }
  if (data.form.type == 1) {
    if (data.form.addressee == "") {
      Notify({type: 'warning', message: '请输入收件人'});
      return;
    }
    if (data.form.phone == "") {
      Notify({type: 'warning', message: '请输入收件人电话'});
      return;
    }
    if (data.addressArea == "") {
      Notify({type: 'warning', message: '请选择收件人地址'});
      return;
    }
    if (data.addressDetailed == "") {
      Notify({type: 'warning', message: '请输入收件人详细地址'});
      return;
    }
    //判断数据格式
    if (!/^1[3456789]\d{9}$/.test(data.form.phone)) {
      Notify({type: 'warning', message: '请输入正确的手机号码'});
      return;
    }

    if (!/^[\u4e00-\u9fa5]{2,4}$/.test(data.form.addressee)) {
      Notify({type: 'warning', message: '请输入正确的收件人姓名'});
      return;
    }
  }

  data.isMasking = true;
  await http.post("/timeMail/add", data.form).then((res) => {
    if (res.data.code === 200) {
      setTimeout(() => {
        data.isMasking = false;
        Toast.success('投递成功');
      }, 2000);
    } else {
      setTimeout(() => {
        data.isMasking = false;
        Toast.fail('投递失败');
      }, 2000);
      if (res.data.msg) {
        Notify({type: 'danger', message: res.data.msg});
      }
    }
  });
};

</script>

<style scoped>
@import url('../static/css/emailMobile.css');
</style>