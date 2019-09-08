<template>
  <div>
    <b-container>
      <b-row v-for="order in orders" v-bind:key="order.id" class="mb-3">
        <b-col>
          <b-card
            class="order-card"
            :bg-variant="bgVariant(order)"
            text-variant="white"
          >
            <b-container>
              <b-row>
                <b-col lg="3" md="3" sm="auto"
                  ><font-awesome-icon icon="user-injured" /> :
                  {{ order.user }}</b-col
                >
                <b-col lg="2" md="2" sm="auto"
                  ><font-awesome-icon icon="money-bill-alt" /> :
                  {{ (Math.floor(order.price * 100) / 100).toFixed(2) }}</b-col
                >
                <b-col lg="2" md="2" sm="auto"
                  ><font-awesome-icon icon="gas-pump" /> : #{{
                    Math.trunc(order.pump)
                  }}</b-col
                >
                <b-col lg="3" md="3" sm="auto"
                  ><font-awesome-icon :icon="statusIcon(order)" /> :
                  {{ order.status }}</b-col
                >
                <b-col lg="2" md="2" sm="auto">
                  <CancelOrder :setStatus="setStatus" :order="order" />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CancelOrder from "./CancelOrder.vue";
import { Status } from "../interfaces/status";
import { Order } from "../interfaces/order";

@Component({
  components: {
    CancelOrder
  }
})
export default class OrderCard extends Vue {
  @Prop() private orders!: [Order];
  @Prop() setStatus?: (status: Status) => any;

  statusIcon(order: Order) {
    switch (order.status) {
      case "CREATED":
        return "plus-circle";
      case "CONFIRMED":
        return "play-circle";
      case "DELIVERED":
        return "check-circle";
      case "DECLINED":
        return "exclamation-circle";
      default:
        return "times-circle";
    }
  }

  bgVariant(order: Order) {
    switch (order.status) {
      case "CREATED":
        return "primary";
      case "CONFIRMED":
        return "info";
      case "DELIVERED":
        return "success";
      case "DECLINED":
        return "warning";
      default:
        return "danger";
    }
  }
}
</script>

<style scoped>
.order-card {
  font-weight: bolder;
}
</style>
