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
                <b-col align="left"
                  ><font-awesome-icon icon="user-injured" /> :
                  {{ order.user }}</b-col
                >
                <b-col
                  ><font-awesome-icon icon="money-bill-alt" /> :
                  {{ order.price }}</b-col
                >
                <b-col
                  ><font-awesome-icon icon="gas-pump" /> : #{{
                    order.pump
                  }}</b-col
                >
                <b-col align="right"
                  ><font-awesome-icon :icon="statusIcon(order)" /> :
                  {{ order.status }}</b-col
                >
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

@Component
export default class OrderCard extends Vue {
  @Prop() private orders!: [object];

  statusIcon(order) {
    switch (order.status) {
      case "CREATED":
        return "plus-circle";
      case "CONFIRMED":
        return "play-circle";
      case "DELIVERED":
        return "check-circle";
      default:
        return "times-circle";
    }
  }

  bgVariant(order) {
    switch (order.status) {
      case "CREATED":
        return "primary";
      case "CONFIRMED":
        return "info";
      case "DELIVERED":
        return "success";
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
