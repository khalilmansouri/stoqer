<template>
  <v-container>
    <!-- <v-btn v-on:click="connect">connect</v-btn> -->
    <v-layout>
      <v-flex ma-1 pa-1 md4>
        <v-text-field
          class="font-weight-black"
          label="CODE BAR"
          outlined
          v-model="this.getScannedCode"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex ma-1 pa-1>
        <v-data-table
          class="elevation-2 font-weight-black display-1"
          :headers="headers"
          :items="products"
          sort-by="calories"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>BAG</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" @click="checkout">CHECKOUT</v-btn>
              <!-- <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">ajouter un produit</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.name" label="Nom de Produit"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.barCode" label="Code bar"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.bayingPrice" label="Prix d'achet"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.sellingPrice" label="Prix de vont"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.quantitey" label="quantite"></v-text-field>
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
              </v-dialog>-->
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
      <v-flex ma-1 pa-1 md4>
        <v-text-field
          rounded
          outlined
          id="styled-input"
          class="styled-input"
          placeholder="0.00"
          label="TOTAL"
          v-model="this.getTotal"
          suffix="DZ"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
#styled-input {
  /* height: auto !important; */
  max-height: none;
  font-size: 50pt;
}
.styled-input label[for] {
  /* height: 100px; */
  max-height: none;
  font-size: 15pt;
}
.styled-input .v-text-field__suffix {
  /* height: 100px; */
  max-height: none;
  font-size: 30pt;
  /* font-weight: bold; */
}
</style>

<script>
import { mapGetters } from "vuex";
import {
  SET_SCANNED_CODE,
  FETCH_PRODUCT_BY_BAR_CODE,
  CHECK_OUT
} from "@/store/actions.type";
export default {
  name: "Transcation",
  components: {},
  data: () => ({
    scannedCode: "",
    dialog: false,
    headers: [
      {
        text: "NOM",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "CODE BAR", value: "barCode" },
      { text: "PRIX (DZD)", value: "sellingPrice" },
      { text: "QUANTITE", value: "quantity" }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  computed: {
    ...mapGetters(["getScannedCode", "getBag", "getTotal"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    initialize() {
      this.products = this.getBag;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    async checkout() {
      await this.$store.dispatch(CHECK_OUT);
    }
  },
  created() {
    this.initialize();
  },
  async mounted() {
    var tmp = "";
    let rep = this;
    document.addEventListener("keypress", async function(e) {
      if (e.key !== "Enter") {
        tmp += e.key;
      } else {
        if (e.key === "Enter") {
          console.log("was ", e.key);
          console.log(tmp);
          await rep.$store.dispatch(SET_SCANNED_CODE, { barCode: tmp });
          tmp = "";
        }
      }
    });
  }
};
</script>
