<template>
  <v-container fluid>

    <v-row>
      <v-col
          class="mb-5"
          cols="auto"
          sm="12"
          md="12"
      >
      <v-card>
        <v-data-table
            :headers="headers"
            :items="books"
            class="elevation-1"
            :search="searchString"
            multi-sort
        >

          <template v-slot:item.author_full_name="{ item }">
            {{ item.author.first_name }} {{ item.author.last_name }}
          </template>

          <template v-slot:top>
            <v-toolbar flat>

              <v-toolbar-title>All books</v-toolbar-title>

              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>

              <v-text-field
                  v-model="searchString"
                  append-icon="mdi-magnify"
                  label="Search string"
                  single-line
                  hide-details
              ></v-text-field>

              <v-spacer></v-spacer>

              <v-dialog
                  v-model="dialog"
                  max-width="700px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    New book
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="info title white--text font-weight-bold">
                    {{ formTitle }}
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form
                          ref="form"
                          v-model="formValid">
                        <v-row>
                          <v-col cols="12" sm="12" md="6" hidden>
                            <v-text-field
                                v-model="editedItem.id"
                                label="Id"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                v-model="editedItem.title"
                                label="Title"
                                required
                                :rules="fieldRules.titleRules.concat(fieldRules.max255Chars)"
                                counter="255"
                                clearable
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                v-model="editedItem.amount"
                                label="Amount"
                                required
                                :rules="fieldRules.positiveValue.concat(fieldRules.amountRules)"
                                type="number"
                                clearable
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-autocomplete
                                v-model="editedItem.author_id"
                                label="Author"
                                :item-text="getAuthorFullName"
                                item-value="id"
                                :items="authors"
                                required
                                :rules="fieldRules.authorRules"
                                clearable
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-textarea
                                name="input-7-1"
                                label="Description"
                                v-model="editedItem.short_description"
                                :rules="fieldRules.max1000Chars.concat(fieldRules.descriptionRules)"
                                counter="1000"
                                clearable
                                required
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red darken-1 font-weight-bold"
                        text
                        @click="close"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="green darken-1 font-weight-bold"
                        text
                        @click="validateForm"
                        :disabled="!enableSave"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                  v-model="dialogRent"
                  max-width="700px"
              >
                <v-card>
                  <v-card-title class="info title white--text font-weight-bold">
                    Rent the book
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form
                          ref="formRent"
                          v-model="formRentValid">
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                v-model="editedItemRent.email"
                                label="Email"
                                required
                                :rules="fieldRules.emailRules.concat(fieldRules.max255Chars)"
                                counter="255"
                                clearable
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                v-model="editedItemRent.quantity"
                                label="Quantity"
                                required
                                :rules="fieldRules.positiveValue.concat(fieldRules.quantityRules)"
                                type="number"
                                clearable
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red darken-1 font-weight-bold"
                        text
                        @click="closeRent"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="green darken-1 font-weight-bold"
                        text
                        @click="validateFormRent"
                        :disabled="!enableSave"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-toolbar>

          </template>

          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    class="mr-2"
                    @click="editItem(item)"
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    class="mr-2"
                    @click="deleteItem(item)"
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    class="mr-2"
                    @click="rentItem(item)"
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-account-arrow-up-outline
                </v-icon>
              </template>
              <span>Rent</span>
            </v-tooltip>

          </template>

        </v-data-table>

      </v-card>

      </v-col>

      <v-snackbar
          v-model="snackbar.active"
          :timeout="2000"
          :color="snackbar.color"
          bottom
      >
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar.active = false">
            Hide
          </v-btn>
        </template>
      </v-snackbar>

    </v-row>

  </v-container>
</template>

<script>
import { booksHeaders } from '@/mixins/data-table-headers'
import { fieldRules } from "@/mixins/field-rules";
import { defaultBook, defaultRent, defaultSnackbar} from "@/mixins/default-items";

export default {
    name: 'BooksPage',
    components: {

    },
    data: () => ({
      searchString: '',
      dialog: false,
      dialogRent: false,
      headers: [],
      books: [],
      authors: [],
      formTitle: 'New book',
      formValid: true,
      formRentValid: true,
      editedItem: {},
      editedItemRent: {},
      editedIndex: -1,
      fieldRules: null,
      enableSave: true,
      snackbar: {},
    }),
    created() {
      this.headers = booksHeaders
      this.fieldRules = fieldRules
      this.editedItem = Object.assign({}, defaultBook)
      this.editedItemRent = Object.assign({}, defaultRent)
      this.snackbar = Object.assign({}, defaultSnackbar)
      this.loadAllBooks();
      this.loadAllAuthors();
    },
    methods: {
      async loadAllAuthors(){
        await this.$store.dispatch('authors/getAllAuthors').then((res) => {
          this.authors = res
        })
      },

      async loadAllBooks(){
        await this.$store.dispatch('books/getAllBooks').then((res) => {
          this.books = res

        })
      },

      editItem (item) {
        this.editedItem = this.books.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.formTitle = item.title
        this.dialog = true
      },

      rentItem (item) {
        this.dialogRent = true
        this.editedItemRent.book_id = item.id
      },

      validateForm(){
        if(this.$refs.form.validate())
          this.save()
      },

      validateFormRent(){
        if(this.$refs.formRent.validate())
          this.rent()
      },

      async save () {
        this.enableSaveButton(false)

        await this.$store.dispatch(this.editedItem.id ? 'books/updateBook' : 'books/createBook', this.editedItem).then(() => {
            this.loadAllBooks();
            this.showSnackbar('Successfully saved', 'green');
            this.dialog = false
        }).catch((e) => {
          this.showSnackbar('Error occurred: ' + e, 'red');
        }).finally(() => {
          this.enableSaveButton(true)
          this.resetDialogTitle()
        })
      },

      async rent() {
        this.enableSaveButton(false)

        await this.$store.dispatch('books/rentBook', this.editedItemRent).then(() => {
          this.showSnackbar('Successfully rented', 'green');
          this.dialogRent = false
        }).catch((e) => {
          this.showSnackbar('Error occurred: ' + e, 'red');
        }).finally(() => {
          this.enableSaveButton(true)
        })
      },

      async deleteItem (item) {
          await this.$store.dispatch('books/deleteBook', item.id).then(() => {
            this.loadAllBooks();
            this.showSnackbar('Successfully deleted', 'green');
          }).catch((e) => {
            this.showSnackbar('Error occurred: ' + e, 'red');
          })
      },

      close () {
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, defaultBook)
          this.editedIndex = -1
        })
        this.$refs.form.resetValidation()
        this.resetDialogTitle()
      },

      closeRent () {
        this.editedItemRent = Object.assign({}, defaultRent)
        this.$refs.formRent.resetValidation()
      },

      showSnackbar(text, color){
        this.snackbar.active = true;
        this.snackbar.text = text;
        this.snackbar.color = color;
      },

      resetDialogTitle() {
        this.formTitle = "New book"
      },

      enableSaveButton(bool){
        this.enableSave = bool
      },

      getAuthorFullName(item) {
        return `${item.first_name} ${item.last_name}`;
      }

    },
    watch: {
      dialog(val){
        val || this.close()
      },
      dialogRent(val){
        val || this.closeRent()
      }
    },
  }
</script>

