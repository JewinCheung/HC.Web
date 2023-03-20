<!--
属性：
nodes 指定树结构的节点数组
node-key 包含唯一节点id的每个节点对象的属性名 key id
label-key 包含节点标签的每个节点对象的属性名 name description
children-key 包含节点子对象列表的每个节点对象的属性名 Children
tick-strategy 用于选择节点的策略类型 none strict leaf leaf-filtered
ticked 勾选的节点的键 --sync
新增属性
tick-strategy="leaf-any-with-parent"  子节点大于0个ticked，则增加父节点 ,子节点等于0个 ticked 则移除不包含子节点的父节点

事件：
@update:ticked 通过复选框勾选/取消勾选节点时发出；配合 watch 提交上层事件update:ticked传递 tickedSync
  -->
<template>
  <q-tree
    ref="tree"
    :nodes="nodes"
    :node-key="nodeKey"
    :label-key="labelKey"
    :children-key="childrenKey"
    :tick-strategy="computedTickStrategy"
    :ticked="tickedSync"
    @update:ticked="(tickedNodeKeys)=>updateTicked(tickedNodeKeys)"
  />
</template>
<script>
export default {
  name: 'MTree',
  data () {
    return { tickedSync: [] }
  },
  props: {
    ticked: Array,
    nodes: {
      type: Array,
      required: true
    },
    nodeKey: {
      type: String,
      required: true
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    childrenKey: {
      type: String,
      default: 'Children'
    },
    tickStrategy: {
      type: String,
      default: 'none',
      validator: v =>
        [
          'none',
          'strict',
          'leaf',
          'leaf-filtered',
          'leaf-any-with-parent'
        ].includes(v)
    }
  },
  mounted () {
    this.tickedSync = this.calcTicked(this.ticked)
  },
  computed: {
    computedTickStrategy () {
      if (this.tickStrategy === 'leaf-any-with-parent') {
        return 'leaf'
      } else {
        return this.tickStrategy
      }
    }
  },
  watch: {
    ticked: {
      immediate: true,
      handler (newVal, oldVal) {
        this.tickedSync = this.calcTicked(newVal)
      }
    }
  },
  methods: {
    updateTicked (nodeKeys) {
      if (this.tickStrategy === 'leaf-any-with-parent') {
        this.tickedSync = this.anyWithParent(nodeKeys)
        this.tickedSync = this.removeParent(this.tickedSync)
        this.$emit('update:ticked', this.tickedSync)
      } else {
        this.tickedSync = nodeKeys
        this.$emit('update:ticked', [...nodeKeys])
      }
      console.log(this.tickedSync)
    },
    // 如果子节点选中大于0个，则增加父节点
    anyWithParent (nodeKeys) {
      if (!nodeKeys || nodeKeys.length === 0) {
        return []
      }
      const keys = [...nodeKeys]
      for (const node of this.nodes) {
        if (this.hasChildren(node)) {
          if (this.isAnyChildTicked(nodeKeys, keys, node[this.childrenKey])) {
            keys.unshift(node[this.nodeKey])
          }
        }
      }
      return [...new Set(keys)]
    },
    isAnyChildTicked (allKeys, keys, children) {
      let anyTicked = false
      for (const child of children) {
        if (this.hasChildren(child)) {
          if (this.isAnyChildTicked(allKeys, keys, child[this.childrenKey])) {
            keys.unshift(child[this.nodeKey])
            anyTicked = true
          }
        } else {
          if (!anyTicked) {
            if (this.arrayContains(allKeys, child[this.nodeKey])) {
              anyTicked = true
            }
          }
        }
      }
      return anyTicked
    },

    // 如果子节点选中等于0个，则移除父节点
    removeParent (nodeKeys) {
      if (!nodeKeys || nodeKeys.length === 0) {
        return []
      }
      const keys = [...nodeKeys]
      for (const node of this.nodes) {
        if (this.hasChildren(node)) {
          if (
            this.isAllChildAnyWithParent(nodeKeys, keys, node[this.childrenKey])
          ) {
            console.log('Remove', node[this.labelKey])
            this.arrayRemove(keys, node[this.nodeKey])
          }
        }
      }
      return [...new Set(keys)]
    },
    isAllChildAnyWithParent (allKeys, keys, children) {
      let allTicked = true
      for (const child of children) {
        if (this.hasChildren(child)) {
          if (
            this.isAllChildAnyWithParent(allKeys, keys, child[this.childrenKey])
          ) {
            console.log('Remove', child[this.labelKey])
            this.arrayRemove(keys, child[this.nodeKey])
          } else {
            allTicked = false
          }
        } else {
          if (allTicked) {
            if (this.arrayContains(allKeys, child[this.nodeKey])) {
              allTicked = false
            }
          }
        }
      }
      return allTicked
    },

    hasChildren (node) {
      if (node && node[this.childrenKey] && node[this.childrenKey].length > 0) {
        return true
      } else {
        return false
      }
    },
    arrayContains (array, key) {
      if (array && array.length > 0) {
        return array.includes(key)
      } else {
        return false
      }
    },
    arrayRemove (array, val) {
      if (array && array.length > 0 && val !== undefined) {
        const idx = array.indexOf(val)
        if (idx !== -1) {
          array.splice(idx, 1)
        }
      }
    },
    calcTicked (ticked) {
      if (!ticked || ticked.length === 0) {
        return []
      }
      if (this.tickStrategy === 'none') {
        return []
      }
      return [...ticked]
    },
    expandAll () {
      this.$refs.tree.expandAll()
    },
    collapseAll () {
      this.$refs.tree.collapseAll()
    }
  }
}
</script>
