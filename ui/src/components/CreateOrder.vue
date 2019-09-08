<template>
  <div class="create-order">
    <b-form id="order-form">
      <b-container>
        <b-row class="mb-4 text-center">
          <b-col lg="5">
            <b-input-group prepend="pump #" class="mb-2 mr-sm-2 mb-sm-2">
              <b-form-input
                id="form-input-pump"
                type="number"
                :state="pumpValidation"
                v-model="form.pump"
              ></b-form-input>
              <b-form-invalid-feedback :state="pumpValidation">
                Please input the pump #.
              </b-form-invalid-feedback>
            </b-input-group>
          </b-col>
          <b-col lg="5">
            <b-input-group prepend="RM" class="mb-2 mr-sm-2 mb-sm-2">
              <b-form-input
                id="form-input-price"
                type="number"
                :state="priceValidation"
                v-model="form.price"
              ></b-form-input>
              <b-form-invalid-feedback :state="priceValidation">
                Please input the price in RM.
              </b-form-invalid-feedback>
            </b-input-group>
          </b-col>
          <b-col>
            <b-button
              v-if="showSave"
              class="form-button mb-sm-2"
              variant="primary"
              :disabled="disableSave"
              v-on:click="submitForm"
              >Save</b-button
            >
            <b-button
              v-if="showClear"
              class="form-button mb-sm-2"
              variant="secondary"
              v-on:click="clear"
              >Clear</b-button
            >
          </b-col>
          <b-col cols="12" class="mt-2">
            <b-alert v-model="showError" variant="danger" dismissible>
              {{ error }}
            </b-alert>
            <b-alert v-model="showSuccess" variant="success" dismissible>
              {{ success }}
            </b-alert>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { protocol, host, port } from "../../configs/order.service.config";

@Component
export default class CreateOrder extends Vue {
  form = {
    pump: undefined,
    price: undefined
  };
  pumpValidation = null;
  priceValidation = null;
  showSave = true;
  disableSave = false;
  showClear = false;
  showError = false;
  error = "Oops. Something went wrong.";
  showSuccess = false;
  success = "Order created, you should see it soon.";

  async submitForm() {
    this.disableSave = true;

    this.form.pump
      ? (this.pumpValidation = true)
      : (this.pumpValidation = false);
    this.form.price
      ? (this.priceValidation = true)
      : (this.priceValidation = false);

    if (this.priceValidation && this.pumpValidation) {
      await fetch(`${protocol}://${host}:${port}/api/orders`, {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
          this.showSuccess = true;
      })
        .catch(() => {
        this.showError = true;
      });
      this.showSave = false;
      this.showClear = true;
    } else {
      this.disableSave = false;
    }
  }

  clear() {
    this.form = {
      pump: undefined,
      price: undefined
    };
    this.pumpValidation = null;
    this.priceValidation = null;
    this.showClear = false;
    this.showSave = true;
    this.disableSave = false;
    this.showSuccess = false;
  }
}
</script>

<style scoped>
.form-button {
  width: 100%;
}
</style>
