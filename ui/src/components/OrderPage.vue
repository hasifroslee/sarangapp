<template>
  <div>
    <b-container>
      <CreateOrder />
      <OrderCard id="order-cards" :orders="visibleOrders" />
      <b-pagination
        @change="pageChanged"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { host, port } from "../../configs/order.service.config";
import CreateOrder from "./CreateOrder.vue";
import OrderCard from "./OrderCard.vue";

@Component({
  components: {
    CreateOrder,
    OrderCard
  }
})
export default class OrderPage extends Vue {
  currentPage = 1;
  perPage = 10;
  orders = null;
  visibleOrders = null;
  timer = 0;
  rows = null;

  created() {
    this.fetchOrdersList();
    this.timer = setInterval(this.fetchOrdersList, 5000);
  }

  fetchOrdersList() {
    fetch(`http://${host}:${port}/api/orders`)
      .then(stream => stream.json())
      .then((data: any) => {
        console.log(data);
        this.orders = data;
        this.visibleOrders = this.calculateVisibleOrders(
          data,
          this.currentPage
        );
        this.rows = data.length;
      });
  }

  pageChanged(page) {
    this.visibleOrders = this.calculateVisibleOrders(this.orders, page);
  }

  calculateVisibleOrders(orders, currentPage) {
    const start =
      currentPage === 1 ? 0 : currentPage * this.perPage - (this.perPage + 1);
    const end =
      currentPage * this.perPage > orders.length
        ? orders.length
        : start + this.perPage;
    return orders.slice(start, end);
  }
}
</script>
