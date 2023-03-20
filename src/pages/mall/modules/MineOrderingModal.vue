<template>
  <q-dialog flat full-height v-model="showDialog">
    <q-card style="min-width: 1080px">
      <q-btn flat dense color="black" class="q-mt-lg q-ml-lg" v-close-popup>
        <q-icon
          class="q-mr-sm"
          name="fas fa-chevron-left"
          style="font-size: 0.8rem;"
        />
        返回订货商城
      </q-btn>
      <q-card
        flat
        class="col q-pa-sm  q-px-mdfull-height text-left  no-shadow  "
      >
        <q-card-section>
          <div class="text-subtitle2 text-grey-8">
            <div class="text-weight-bolder q-px-sm q-pb-md">
              我的订货单
            </div>
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="q-separator q-separator q-separator--horizontal"
            />
          </div>
        </q-card-section>

        <q-card-section>
          <q-list
            bordered
            class="full-width rounded-borders shadow-2"
            style="min-height: 140px;"
          >
            <q-item class="q-px-sm full-width justify-between items-center">
              <q-item-section side class="q-mt-sm">
                <q-item-label>订单编号：1001A810000000382JEE</q-item-label>
                <q-item-label caption>
                  2023-02-02 14:39:4
                </q-item-label>
              </q-item-section>
               <q-item-section>
                 </q-item-section>
              <q-item-section side>
                状态：待审核

              </q-item-section>
              <q-item-section side>
                <q-icon name="info" color="green" />
              </q-item-section>
              <q-item-section top side class="q-mx-sm q-mt-sm">
                <q-btn
                  class="q-my-lg"
                  label="申请发货"
                  style="background-color: rgb(136, 58, 43); color: white;width: 120px;"
                  @click="joinNewOrdering"
                >
                </q-btn>
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item
              class="row no-wrap q-px-sm full-width justify-between items-center"
            >
              <q-item-section top avatar class="col-1 q-ml-sm">
                <img
                  class="q-mx-auto"
                  :src="'/data/materia_img/1.jpg'"
                  style="width: 50px; height: 10%;"
                />
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  <span class="text-weight-bold">42%金字牌复合肥-黄</span>
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label caption lines="1">
                  <span class="text-grey-8">40kg(16-16-10)金1307b/高氯</span>
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  <div style="font-size: 1.1em; font-weight: 600;">
                    51/吨
                  </div>
                </q-item-label>
              </q-item-section>
              <q-item-section top side class="q-mr-md">
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="text-red-3"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-separator spaced />
            <q-item
              class="row no-wrap q-px-sm full-width justify-between items-center"
            >
              <q-item-section top avatar class="col-1 q-ml-sm">
                <img
                  class="q-mx-auto"
                  :src="'/data/materia_img/1.jpg'"
                  style="width: 50px; height: 10%;"
                />
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  <span class="text-weight-bold">42%金字牌复合肥-黄</span>
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label caption lines="1">
                  <span class="text-grey-8">40kg(16-16-10)金1307b/高氯</span>
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  <div style="font-size: 1.1em; font-weight: 600;">
                    51/吨
                  </div>
                </q-item-label>
              </q-item-section>
              <q-item-section top side class="q-mr-md">
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="text-red-3"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="primary" />
        </slot>
      </template>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'MineOrderingModal',
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
      materialNum: 1,
      panel: 'mails',
      check1: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    show () {
      console.log(1)
      this.showDialog = true
    },

    handleOk () {},
    joinNewOrdering () {
      this.$message.warning('订单审核中')
    }
  }
}
</script>
