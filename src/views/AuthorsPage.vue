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
            :items="authors"
            class="elevation-1"
            :search="searchString"
            multi-sort
        >

        <template v-slot:top>
          <v-toolbar flat>

            <v-toolbar-title>All Authors</v-toolbar-title>

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
                  New author
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
                              v-model="editedItem.first_name"
                              label="First name"
                              required
                              :rules="fieldRules.firstNameRules.concat(fieldRules.max255Chars)"
                              counter="255"
                              clearable
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                              v-model="editedItem.last_name"
                              label="First name"
                              required
                              :rules="fieldRules.lastNameRules.concat(fieldRules.max255Chars)"
                              counter="255"
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
import { authorsHeaders } from '@/mixins/data-table-headers'
import { fieldRules } from "@/mixins/field-rules";
import { defaultAuthor, defaultSnackbar } from "@/mixins/default-items";

export default {
    name: 'AuthorsPage',
    components: {

    },
    data: () => ({
      searchString: '',
      dialog: false,
      headers: [],
      authors: [],
      formTitle: 'New author',
      formValid: true,
      editedItem: {},
      editedIndex: -1,
      fieldRules: null,
      enableSave: true,
      snackbar: {},
    }),
    created() {
      this.headers = authorsHeaders
      this.fieldRules = fieldRules
      this.editedItem = Object.assign({}, defaultAuthor)
      this.snackbar = Object.assign({}, defaultSnackbar)
      this.loadAllAuthors();
    },
    methods: {
      async loadAllAuthors(){
        await this.$store.dispatch('authors/getAllAuthors').then((res) => {
          this.authors = res
        })
      },

      editItem (item) {
        this.editedItem = this.authors.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.formTitle = item.first_name
        this.dialog = true
      },

      validateForm(){
        if(this.$refs.form.validate())
          this.save()
      },

      async save () {
        this.enableSaveButton(false)

        await this.$store.dispatch(this.editedItem.id ? 'authors/updateAuthor' : 'authors/createAuthor', this.editedItem ).then(() => {
            this.loadAllAuthors();
            this.showSnackbar('Successfully saved', 'green');
            this.dialog = false
        }).catch((e) => {
          this.showSnackbar('Error occurred: ' + e, 'red');
        }).finally(() => {
          this.enableSaveButton(true)
          this.resetDialogTitle()
        })
      },

      async deleteItem (item) {
        await this.$store.dispatch('authors/deleteAuthor', item.id).then(() => {
          this.loadAllAuthors();
          this.showSnackbar('Successfully deleted', 'green');
        }).catch((e) => {
          this.showSnackbar('Error occurred: ' + e, 'red');
        })
      },

      close () {
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, defaultAuthor)
          this.editedIndex = -1
        })
        this.$refs.form.resetValidation()
        this.resetDialogTitle()
      },

      showSnackbar(text, color){
        this.snackbar.active = true;
        this.snackbar.text = text;
        this.snackbar.color = color;
      },

      resetDialogTitle() {
        this.formTitle = "New author"
      },

      enableSaveButton(bool){
        this.enableSave = bool
      }

    },
    watch: {
      dialog(val){
        val || this.close()
      }
    },
  }
</script>

