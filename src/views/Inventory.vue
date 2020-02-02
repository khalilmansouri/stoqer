<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-data-table class="elevation-3" :headers="headers" :items="products" sort-by="calories">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Produits</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">New Product</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.name" label="product name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field autofocus v-model="editedItem.barCode" label="barCode"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.bayingPrice" label="price"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.sellingPrice" label="sellingPrice (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.quantity" label="quantity"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item)">delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import {
  ADD_PRODUCT,
  FETCH_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../store/actions.type";
import { async } from "q";

export default {
  name: "App",
  components: {},
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "NAME",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "BAR CODE", value: "barCode" },
      { text: "Price (DZD)", value: "bayingPrice" },
      { text: "selling Price (DZD)", value: "sellingPrice" },
      { text: "Quantity", value: "quantity" },
      { text: "Actions", value: "action", sortable: false }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      barCode: "",
      bayingPrice: 0,
      sellingPrice: 0,
      quantity: 0
    },
    defaultItem: {
      name: "",
      barCode: "",
      bayingPrice: 0,
      sellingPrice: 0,
      quantity: 0
    }
  }),
  computed: {
    ...mapGetters(["getScannedCode", "getProducts"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    products: {
      handler(newProduct, oldProduct) {
        console.log(newProduct);
        this.products = newProduct;
      },
      deep: true
    }
  },

  methods: {
    initialize() {
      this.products = this.getProducts;
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        (await this.$store.dispatch(DELETE_PRODUCT, item.barCode));
      await this.$store.dispatch(FETCH_PRODUCT);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if (this.editedIndex > -1) {
        await this.$store.dispatch(UPDATE_PRODUCT, this.editedItem);
      } else {
        await this.$store.dispatch(ADD_PRODUCT, this.editedItem);
      }
      await this.$store.dispatch(FETCH_PRODUCT);
      this.initialize();
      this.close();
    },
    async fetchProducts() {
      await this.$dispatch(FETCH_PRODUCT);
    }
  },
  async mounted() {
    await this.$store.dispatch(FETCH_PRODUCT);
    this.initialize();
  }
};
</script>
