<template>
  <button v-on:click="cancelOrder" class="btn-cancel-order">
    <font-awesome-icon icon="trash-alt" />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { protocol, host, port } from "../../configs/order.service.config";
import { Order } from "../interfaces/order";
import { Status } from "../interfaces/status";

@Component
export default class CancelOrder extends Vue {
  @Prop() order!: Order;
  @Prop() setStatus?: (status: Status) => any;

  status = {
    showSuccess: false,
    success: "Order status is or will move to CANCELLED",
    showError: false,
    error: ""
  };

  cancelOrder() {
    fetch(`${protocol}://${host}:${port}/api/orders/${this.order.id}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async response => {
        if (response.ok) {
          this.setStatus({ ...this.status, showSuccess: true });
        } else {
          const body = await response.json();
          this.setStatus({
            ...this.status,
            showError: true,
            error: body.message
          });
        }
      })
      .catch(error => {
        this.setStatus({
          ...this.status,
          showError: true,
          error: error.message
        });
      });
  }
}
</script>

<style scoped>
.btn-cancel-order {
  background: inherit;
  border: none;
  color: inherit;
}
</style>
