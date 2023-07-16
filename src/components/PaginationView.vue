<template>
  <div class="container">
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: pageInfo.isFirstPage}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pageInfo.currentPage - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in allPagesData.totalPages" :key="page + '12'" :class="{active: page === pageInfo.currentPage}">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item"  :class="{ disabled: pageInfo.isLastPage}">
          <a class="page-link" href="#" aria-label="Next"  @click.prevent="changePage(pageInfo.currentPage + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  props: {
    allPagesData: {
      type: Object
    }
  },
  data () {
    return {
      // currentPageData: [],
      pageInfo: {
        totalPages: 1,
        currentPage: 1,
        isFirstPage: true,
        isLastPage: false
      }
    }
  },
  methods: {
    changePage (page) {
      this.$emit('emit-get-page', page)
      this.pageInfo.currentPage = page
      page === 1 ? this.pageInfo.isFirstPage = true : this.pageInfo.isFirstPage = false
      this.pageInfo.currentPage === this.allPagesData.totalPages ? this.pageInfo.isLastPage = true : this.pageInfo.isLastPage = false
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
