<template>
  <q-page class="q-pa-sm">
    <div class="base-card-shadow" style="background-color: white">
      <div class="row search" ref="search">
        <q-item class="col-xl-3 col-sm-6 col-xs-12">
          <q-item-section class="col-2 text-right gt-sm">
            <q-item-label>角色名称:</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-input outlined dense square placeholder="请输入名称查询" v-model="queryParam.key" clearable></q-input>
          </q-item-section>
        </q-item>
        <template v-if="toggleSearchStatus">
          <q-item class="col-xl-3 col-sm-6 col-xs-12">
            <q-item-section class="col-2 text-right gt-sm">
              <q-item-label>角色名称:</q-item-label>
            </q-item-section>
            <q-item-section class="col">
              <q-input
                outlined
                dense
                square
                placeholder="请输入名称查询"
                v-model="queryParam.roleName"
                clearable
              ></q-input>
            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-sm-6 col-xs-12">
            <q-item-section class="col-2 text-right gt-sm">
              <q-item-label>角色名称:</q-item-label>
            </q-item-section>
            <q-item-section class="col">
              <q-input
                outlined
                dense
                square
                placeholder="请输入名称查询"
                v-model="queryParam.roleName"
                clearable
              ></q-input>
            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-sm-6 col-xs-12">
            <q-item-section class="col-2 text-right gt-sm">
              <q-item-label>角色名称:</q-item-label>
            </q-item-section>
            <q-item-section class="col">
              <q-input
                outlined
                dense
                square
                placeholder="请输入名称查询"
                v-model="queryParam.roleName"
                clearable
              ></q-input>
            </q-item-section>
          </q-item>
        </template>
        <q-item class="col-xl-3 col-sm-6 col-xs-12 q-pr-sm">
          <q-item-label class="col-12">
            <q-btn
              unelevated
              label="查询"
              color="primary"
              icon="search"
              class="q-mr-sm no-border-radius"
              :loading="loading"
              @click="searchQuery"
            >
              <template v-slot:loading>
                <q-spinner-ios class="on-center" />
              </template>
            </q-btn>
            <q-btn
              outline
              unelevated
              label="重置"
              class="q-mr-sm no-border-radius"
              color="secondary"
              icon="refresh"
              @click="searchReset()"
            />
            <q-btn-dropdown
              v-model="toggleSearchStatus"
              persistent
              dense
              flat
              color="primary"
              :label="toggleSearchStatus ? '收起' : '展开' "
            ></q-btn-dropdown>
          </q-item-label>
        </q-item>
      </div>
    </div>
    <div class="q-mt-sm base-card-shadow" style="background-color: white;">
      <div class="q-pa-md">
        <q-table
          ref="table"
          class="table-sticky-header"
          separator="cell"
          :style="computedStyle"
          virtual-scroll
          square
          flat
          :data="dataSource"
          :columns="columns"
          row-key="id"
          :visible-columns="visibleColumns"
          @request="loadData"
          :loading="loading"
          :fullscreen.sync="isFullscreen"
          :pagination.sync="pagination"
          :rows-per-page-options="pageSizeOptions"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:top-left>
            <!-- style="background: #1890ff; color: white" -->
            <div>
              <q-btn label="新增" color="primary" icon="add" @click="handleAdd()" />
            </div>
          </template>
          <template #body-cell-opt="props">
            <q-td :props="props" :auto-width="true">
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="account_box"
                @click.stop="handlePerssion(props.row.ID)"
              >
                <q-tooltip>授权</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="edit"
                @click.stop="handleEdit(props.row)"
              >
                <q-tooltip>编辑</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="red"
                icon="delete"
                @click="handleDelete(props.row.ID,props.row.ROLE_NAME)"
              >
                <q-tooltip>删除</q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:top-right="props">
            <div>
              <q-btn rounded flat dense size="md" icon="autorenew" @click="loadData">
                <q-tooltip>刷新</q-tooltip>
              </q-btn>
              <q-btn
                rounded
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
              >
                <q-tooltip>全屏</q-tooltip>
              </q-btn>
              <q-btn-dropdown
                rounded
                flat
                dense
                size="md"
                auto-close
                outline
                no-icon-animation
                class="btn-dropdown-hide-droparrow"
                icon="apps"
              >
                <div class="row no-wrap q-pa-sm">
                  <div class="column">
                    <q-toggle
                      v-model="visibleColumns"
                      v-for="item in columns"
                      :key="item.name"
                      :val="item.name"
                      :label="item.label"
                    />
                  </div>
                </div>
              </q-btn-dropdown>
            </div>
          </template>
          <template v-slot:pagination="scope">
            <div class="justify-center row items-center">
              <div class="col-auto">
                <q-pagination
                  v-model="pagination.page"
                  color="primary"
                  :max="scope.pagesNumber"
                  :max-pages="4"
                  :boundary-numbers="false"
                  :boundary-links="true"
                  :ellipses="false"
                  class="float-right"
                  input-class="text-orange-10"
                  input
                  @input="loadData"
                />
              </div>
              <div class="col-auto">
                <span class="q-ml-sm q-mr-xs">共 {{pagination.rowsNumber}} 条</span>
              </div>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <role-modal ref="modalForm" @ok="modalFormOk"></role-modal>
    <user-role-modal ref="modalUserRole"></user-role-modal>
  </q-page>
</template>

<script>
import { TableMixin } from '@/mixins/TableMixin'
import RoleModal from './modules/RoleModal'
import UserRoleModal from './modules/UserRoleModal'
export default {
  name: 'RoleList',
  mixins: [TableMixin],
  components: { RoleModal, UserRoleModal },
  data () {
    return {
      queryParam: { key: '' },
      isorter: {
        column: ' CREATE_DATE',
        order: ' ASC'
      },
      visibleColumns: ['ROLE_NAME', 'ROLE_CODE', 'CREATE_DATE', 'opt'],
      columns: [
        {
          name: 'ROLE_NAME',
          align: 'center',
          label: '角色名称',
          field: 'ROLE_NAME'
        },
        {
          name: 'ROLE_CODE',
          align: 'center',
          label: '角色编码',
          field: 'ROLE_CODE'
        },
        {
          name: 'DESCRIPTION',
          align: 'left',
          label: '描述',
          field: 'DESCRIPTION'
        },
        {
          name: 'CREATE_DATE',
          align: 'center',
          label: '创建时间',
          field: 'CREATE_DATE',
          sortable: true
        },
        {
          name: 'opt',
          align: 'center',
          label: '操作',
          field: 'opt'
        }
      ],
      url: {
        list: '/api/role/list',
        delete: '/api/role/delete'
      }
    }
  },
  mounted () {},
  methods: {
    handlePerssion (roleId) {
      this.$refs.modalUserRole.show(roleId)
    }
  }
}
</script>
