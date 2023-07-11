<template>
  <q-dialog flat full-height v-model="showDialog" transition-show="slide-left">
    <q-card flat square class=" fit no-scroll " style="min-width: 1080px">
      <q-card-section
        class="q-pa-none text-white text-subtitle "
        style="background: rgb(21,113,62);"
      >
        <div class="flex justify-between flex-center">
          <q-btn
            size="10px"
            color="white"
            round
            flat
            icon="fa fa-chevron-left"
            class="q-my-auto q-ma-sm"
            v-close-popup
          />
          <div class="q-py-md q-pl-md col">
            <div data-test="text-defaultcontentpreview-title">
              {{ material.name }}
            </div>
          </div>
          <q-btn
            class="q-my-auto q-ma-sm"
            size="10px"
            color="white"
            round
            flat
            icon="fa fa-times"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        style="height: calc(100%)"
        class="scroll q-px-xs q-py-none"
      >
        <q-tab-panels v-model="panel">
          <q-tab-panel name="mails">
            <div class="row flex well justify-center">
              <div class="col-xs-12 text-left q-pa-md">
                <q-item-label class="row justify-between">
                  <div class="col text-h5 text-bold">
                    {{ material.name }}
                    <div class="flex text-grey-6 text-caption">
                      <div>
                        <span class="text-bold">ID:</span> {{ material.code }}
                      </div>
                    </div>
                  </div>
                  <div class="col-auto q-pl-lg">
                    <q-btn
                      flat
                      round
                      class="q-ma-xs"
                      style="font-size: 10px; color: rgb(176, 64, 64);"
                      icon="far fa-star"
                    >
                      <q-tooltip>添加收藏</q-tooltip>
                    </q-btn>
                  </div>
                </q-item-label>
                <!---->
              </div>
              <div class="col-xs-12 col-md-7">
                <div class="row">
                  <div class="col-xs-12 col-sm-5 q-pa-md">
                    <div
                      class="column flex flex-center justify-between full-height"
                    >
                      <!-- border: 4px solid #c4ccc4;border-radius: 4px; -->
                      <q-img
                        :src="
                          material.scalepicPath
                            ? $global.getImgUrl(material.picPath)
                            : '/data/bigAlbum.gif'
                        "
                        spinner-color="black"
                        class="shadow-10   rounded-borders"
                        style="max-height: 600px; max-width: 400px;"
                      />

                      <div
                        class="full-width q-pt-md"
                        style="width: 220px !important;"
                      >
                        <!-- <div
                          class="flex full-width q-px-md q-pb-md q-gutter-xs col-shrink justify-around"
                        >
                          <button
                            tabindex="0"
                            type="button"
                            role="button"
                            class="q-btn q-btn-item non-selectable no-outline text-white q-btn--standard q-btn--round q-btn--actionable q-focusable q-hoverable q-btn--wrap"
                            data-test="button-sharebuttons-copylink"
                            style="background-color: grey; width: 50px !important; height: 50px !important;"
                          >
                            <span class="q-focus-helper" tabindex="-1"></span
                            ><span class="q-btn__wrapper col row q-anchor--skip"
                              ><span
                                class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
                                ><i
                                  aria-hidden="true"
                                  role="img"
                                  class="fa fa-link q-icon notranslate"
                                >
                                </i></span
                            ></span></button
                          ><button
                            tabindex="0"
                            type="button"
                            role="button"
                            class="q-btn q-btn-item non-selectable no-outline text-white q-btn--standard q-btn--round q-btn--actionable q-focusable q-hoverable q-btn--wrap"
                            style="background-color: rgb(66, 103, 178); width: 50px !important; height: 50px !important;"
                          >
                            <span class="q-focus-helper" tabindex="-1"></span
                            ><span class="q-btn__wrapper col row q-anchor--skip"
                              ><span
                                class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
                                ><i
                                  aria-hidden="true"
                                  role="img"
                                  class="fab fa-facebook-f q-icon notranslate"
                                >
                                </i></span
                            ></span></button
                          ><button
                            tabindex="0"
                            type="button"
                            role="button"
                            class="q-btn q-btn-item non-selectable no-outline text-white q-btn--standard q-btn--round q-btn--actionable q-focusable q-hoverable q-btn--wrap"
                            style="background-color: rgb(29, 161, 242); width: 50px !important; height: 50px !important;"
                          >
                            <span class="q-focus-helper" tabindex="-1"></span
                            ><span class="q-btn__wrapper col row q-anchor--skip"
                              ><span
                                class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
                                ><i
                                  aria-hidden="true"
                                  role="img"
                                  class="fab fa-twitter q-icon notranslate"
                                >
                                </i></span
                            ></span>
                          </button>
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="col q-pa-md">
                    <q-item-label class="text-body1 text-grey-10 q-mb-md">
                      <br />
                      规格说明: {{ material.materialspec }}
                      <br />
                    </q-item-label>
                    <q-card bordered class="q-pt-sm no-shadow">
                      <div class="q-mt-sm full-width row q-mb-sm">
                        <div class="column full-width q-px-md">
                          <div class="full-width q-gutter-y-sm column">
                            <span class=""
                              ><div
                                data-test="comp-contentitemprices-sg_fredmcdowell1"
                                class="text-caption q-px-md q-pb-xs"
                                align="center"
                                style="font-size: 0.8rem;"
                              >
                                <!---->
                                <div>
                                  <!----><!---->
                                  <div
                                    class="col-6"
                                    style="font-size: 1.1em; font-weight: 600;"
                                  >
                                    型号：{{ material.materialtype }}
                                  </div>
                                </div>
                              </div>
                            </span>
                            <span class=""
                              ><div
                                data-test="comp-contentitemprices-sg_fredmcdowell1"
                                class="text-caption q-px-md q-pb-xs"
                                align="center"
                                style="font-size: 0.8rem;"
                              >
                                <!---->
                                <div>
                                  <!----><!---->
                                  <div
                                    style="font-size: 1.1em; font-weight: 600;"
                                  >
                                    品牌：{{ material.brand }}
                                  </div>
                                </div>
                              </div>
                            </span>
                            <span class=""
                              ><div
                                class="row text-caption q-px-md q-pb-xs"
                                align="center"
                                style="font-size: 0.8rem;"
                              >
                                <!---->

                                <!----><!---->
                                <div
                                  class="q-my-auto col-5 "
                                  style="font-size: 1.1em; font-weight: 600;"
                                >
                                  数量：
                                </div>
                                <div class="col-6">
                                  <q-input
                                    standout="bg-teal text-white"
                                    style="max-width: 100px;text-align: center;"
                                    v-model="material.materialNum"
                                    dense
                                    type="number"
                                    :min="0"
                                    @blur="checkNum(material)"
                                  />

                                  <!-- <q-input
                                    standout="bg-teal text-white"
                                    v-model.number="material.materialNum"
                                    dense
                                    type="number"
                                    outlined
                                    @blur="checkNum(material)"
                                  />-->
                                </div>
                                <div class="q-my-auto col-1">吨</div>
                              </div>
                            </span>

                            <q-btn
                              class="q-mb-ms bg-indigo-6 text-white q-py-sm full-width"
                              style="background-color: white; color: white;"
                              size="12px"
                              @click="joinNewOrdering"
                            >
                              <q-icon
                                left
                                size="24px"
                                name="fa fa-shopping-cart"
                              />
                              <div>加入新订货单</div>
                            </q-btn>

                            <q-btn
                              class="q-mb-ms bg-green-7 text-white q-py-sm full-width"
                              style="background-color: white; color: white;"
                              size="12px"
                              @click="joinOrdering()"
                            >
                              <q-icon
                                left
                                size="24px"
                                name="fas fa-clipboard-list"
                              />
                              <div>添加到订货单</div>
                            </q-btn>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="q-pb-lg full-width q-px-md">
                        <q-btn
                          class="q-mb-ms text-white q-py-sm full-width"
                          style="background-color: orange; color: white;"
                          size="12px"
                        >
                          <q-icon left size="24px" name="fa fa-gift" />
                          <div>加入心愿单</div>
                        </q-btn>
                      </div> -->
                    </q-card>
                    <!---->
                  </div>
                </div>
                <div>
                  <hr
                    role="separator"
                    aria-orientation="horizontal"
                    class="q-separator q-separator q-separator--horizontal q-separator--horizontal-inset"
                    style="margin-bottom: 8px; margin-top: 8px;"
                  />
                  <div class="well q-pa-md">
                    <div
                      class="q-ml-sm backwards-html-compatibility"
                      style="line-height: 1.75em; font-size: 16px;"
                    >
                      <p>
                        {{ material.remark }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="primary" />
        </slot>
      </template>
    </q-card>
  </q-dialog>
</template>
<script>
import { getMaterDetail } from '@/api/api'
// import deepClone from '@/utils/CloneUtils'
export default {
  name: 'MaterialModal',
  data () {
    return {
      title: '操作',
      loading: false,
      disableSubmit: false,
      showDialog: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      material: {},

      panel: 'mails',
      isCk: true
    }
  },
  watch: {},
  computed: {
    // materialNum () {
    //   return this.material.materialNum
    // }
  },
  methods: {
    detail (item) {
      this.showDialog = true
      // this.material = item
      // this.material.materialNum = 1
      this.getMaterDetail(item.id)
    },

    getMaterDetail (id) {
      this.loading = true
      getMaterDetail(id).then(res => {
        console.log(res.data)
        res.data.materialNum = 1
        this.material = Object.assign({}, res.data)

        this.material.material_class_code = res.data.code.substring(0, 2)
        this.loading = false
      })
    },
    handleOk () {},
    joinNewOrdering () {
      // if (this.arrayContains()) {
      //   this.$message.warning('该商品已存在')
      //   return
      // }
      if (!this.hasChildren(this.material.code.substring(0, 2))) {
        this.$message.warning('商品不在同一大类，不能添加！')
        return
      }
      if (this.material.materialNum > 0) {
        console.log('添加商品：', this.material)
        this.$store.commit('SET_MESSAGE_ADD', this.material)
        this.$message.success('添加到新订单成功')
      }
    },
    joinOrdering () {
      if (this.material.materialNum > 0) {
        this.$emit('openOrdering', this.material)
      }
    },
    arrayContains () {
      if (
        this.$store.getters.getMaterial &&
        this.$store.getters.getMaterial.length > 0
      ) {
        const newArr = this.$store.getters.getMaterial.filter(item => {
          return item.id === this.material.id
        })
        console.log(newArr.length)
        return newArr.length > 0
      } else {
        return false
      }
    },
    hasChildren (key) {
      if (
        this.$store.getters.getMaterial &&
        this.$store.getters.getMaterial.length > 0
      ) {
        console.log(
          key + '-' + this.$store.getters.getMaterial[0].code.substring(0, 2)
        )
        return this.$store.getters.getMaterial[0].code.substring(0, 2) === key
      } else {
        return true
      }
    },
    checkNum (material) {
      console.log('数量检查', material)
      if (material.materialNum <= 0) {
        // material.materialNum = 1
        this.$message.warning('数量必须大于0')
      }
    }
  }
}
</script>
