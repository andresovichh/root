Skip to content
DEV Community
Search...

Log in
Create account

7

3

27

Cover image for Learn the basics of Vue.js by building a simple CRUD App: A Tutorial
RoryJZauner
RoryJZauner
Posted on Aug 5, 2021 • Updated on Aug 19, 2021

Learn the basics of Vue.js by building a simple CRUD App: A Tutorial
#
uxengineering
#
vue
#
javascript
#
codenewbie
In this post we will be looking at writing a single-page application using Vue 2.x as our framework.

The aim of this app will be to manage customer data, a very basic CRM-system.

Vue has gained popularity over the years and is a very quick framework to pick up. The awesome Vue-Team has released Vue 3.x, however, the basics used in Vue 2.x can be transferred to Vue 3.

What we will be taking a look at
Project Setup using the Vue CLI
Creating Components
Styling with BootstrapVue
Json-Server for API Mocking
Making Http-Requests
Conditional Rendering of Elements
Displaying Data
Handling User Input
If you want to follow along, you will need the following installed on your machine:

Nodejs
Vue CLI
Your trusty IDE (I am using VSCode, but you can use whatever you want)
If you are unsure as to whether or not to start with a single-page-framework such as Vue or React, then you can have a look at my other article where I talk about the JavaScript features that helped me become more productive with Vue and React.

Project Setup
Using the Vue CLI allows us to quickly scaffold an entire Vue projects with a few commands. We can also manage our Vue-related dependencies such as Vue-Router and Vuex using the CLI.

To start with, run the following command:
vue create vue-tutorial
Then let us manually select features:
Screenshot of terminal

And then let us include the Vue-Router:
Screenshot of terminal

Then we can configure the rest to be:
Screenshot of terminal

I won't be saving this setup, but you can if you want to use this in future projects.

Then let us cd into the directory and run. npm run serve which will start our development server. This allows us to check that everything is working as expected before we continue with our project setup.

Vue default page on completed setup

Now that we have that, we can have a look at setting up Bootstrap for our project.

We first install the dependencies:
npm install bootstrap bootstrap-vue 
After those have been installed, we need to open up our project in our IDE and open the main.js file.

Here we will add in a couple of lines that tell Vue to use our freshly installed Bootstrap and BootstrapVue dependencies:
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
You may have noticed that there is also a IconsPlugin that we are adding. This allows us to use the Bootstrap Icons throughout our entire project.

At this point I like to just restart the development server and recompile everything. So simply hit ctrl + C and run npm run serve once more to get everything up and running again.

Awesome! Setup complete, we can now start creating our component and pages.

Mocking the Backend
As a frontend engineer, you may well find that the api endpoints you are going to be using not quite ready yet.

In such cases, we can use json-server.

Once installed, it allows us to create, read, update and delete records without having to write a single line of backend code.

To install it, we can use:
npm install -g json-server
Then we create a new file called db.json directly on the root directory and fill it with the data we want:
{
  "customers": [
    {
      "id": 1,
      "company_name": "My awesome Company",
      "contact_firstname": "Jane",
      "contact_lastname": "Doe",
      "contact_email": "jdoe@awesome.com",
      "acquired_on": "2021-04-03",
      "customer_status": "active"
    },
    {
      "id": 2,
      "company_name": "Company ABC",
      "contact_firstname": "Sarah",
      "contact_lastname": "Jane",
      "contact_email": "sjane@coabc.com",
      "acquired_on": "2021-06-03",
      "customer_status": "active"
    },
    {
      "id": 3,
      "company_name": "Company xYZ",
      "contact_firstname": "Tim",
      "contact_lastname": "Hane",
      "contact_email": "thane@coxyz.com",
      "acquired_on": "2020-12-03",
      "customer_status": "active"
    },
    {
      "id": 4,
      "company_name": "Video Production Consulting",
      "contact_firstname": "Miriam",
      "contact_lastname": "Doe",
      "contact_email": "mdoe@vidprod.com",
      "acquired_on": "2020-07-05",
      "customer_status": "inactive"
    },
    {
      "id": 5,
      "company_name": "Code Writers",
      "contact_firstname": "Jill",
      "contact_lastname": "Wade",
      "contact_email": "jwade@codewrit.com",
      "acquired_on": "2020-04-03",
      "customer_status": "active"
    }
  ]
}
Now we can make these records available, by running the following command:
json-server --watch db.json
This will allow us to send and receive data by visiting "http://localhost:3000/customers/".

Great!

Now we can create our application to interact with this mock-api.

Creating Components and Pages
Let us start with our topmost component: App.vue.

Here we will remove the style-tag at the end and the navigation:
<template>
  <div>
    <header-bar></header-bar>
    <b-container>
      <b-row class="mt-5">
        <router-view />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";

export default {
  components: {
    HeaderBar,
  },
};
</script>
As you can see we have a HeaderBar.vue component that we haven't created yet.

Head over to your components directory and create a new file called HeaderBar.vue with the following code:
<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-container>
      <b-row class="text-white">
        <b-col>
          <b-icon-people-fill class="h2"></b-icon-people-fill>
        </b-col>
        <b-col>
          <span class="h3">CRM</span>
        </b-col>
      </b-row>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>
This will give us a nice header along the top of our app with a logo and some text:

Header bar example

You have created your first Vue component! That's awesome!

As you can see, we are able to seamlessly add icons to our design without having to go through too much effort in setting everything up.

We can now have a look at removing the default code from our Home.vue and start building our app.

This will be our overview page. We can search for customers and also have a quick scan of their data.

We first need to install axis for us to be able to send and receive data from our backend:
npm install axios
After that, we can import it whenever and wherever we need it.

Now we can create a simple data-table component:
<template>
  <div>
    <b-row>
      <data-table></data-table>
    </b-row>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";

export default {
  name: "Home",
  components: {
    DataTable,
  },
};
</script>
And we can now create our DataTable.vue component with a CustomerOverview component:
<template>
  <div>
    <b-row>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        {{ alertMessage }}
      </b-alert>
    </b-row>
    <b-row>
      <customer-overview
        :totalCustomers="numberOfCustomers"
        :activeCustomers="activeCustomers"
        @totalCustomersIsActive="setFilterTotalIsActive"
        @activeCustomerIsActive="setFilterActiveIsActive"
      ></customer-overview>
    </b-row>
    <b-row class="mt-3">
      <b-card>
        <b-row align-h="between">
          <b-col cols="6">
            <h3>{{ tableHeader }}</h3>
          </b-col>
          <b-col cols="2">
            <b-row>
              <b-col>
                <b-button
                  variant="primary"
                  id="show-btn"
                  @click="showCreateModal"
                >
                  <b-icon-plus class="text-white"></b-icon-plus>
                  <span class="h6 text-white">New Customer</span>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-table
            striped
            hover
            :items="items"
            :fields="fields"
            class="text-center"
          >
            <template #cell(contact_name)="data">
              {{
                `${data.item.contact_firstname} ${data.item.contact_lastname}`
              }}
            </template>
            <template #cell(customer_status)="data">
              <b-icon-bookmark-check-fill
                variant="success"
                v-if="data.item.customer_status === 'active'"
              ></b-icon-bookmark-check-fill>
              <b-icon-bookmark-x-fill
                variant="danger"
                v-else
              ></b-icon-bookmark-x-fill>
            </template>
            <template #cell(actions)="data">
              <b-row>
                <b-col cols="7">
                  <b-icon-pencil-square
                    class="action-item"
                    variant="primary"
                    @click="getRowData(data.item.id)"
                  ></b-icon-pencil-square>
                </b-col>
                <b-col cols="1">
                  <b-icon-trash-fill
                    class="action-item"
                    variant="danger"
                    @click="showDeleteModal(data.item.id)"
                  ></b-icon-trash-fill>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-row>
      </b-card>
    </b-row>

    <!-- Modal for adding new customers -->
    <b-modal
      ref="create-customer-modal"
      size="xl"
      hide-footer
      title="New Customer"
    >
      <create-customer-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertCreate"
      ></create-customer-form>
    </b-modal>

    <!-- Modal for updating customers -->
    <b-modal
      ref="edit-customer-modal"
      size="xl"
      hide-footer
      title="Edit Customer"
    >
      <edit-customer-form
        @closeEditModal="closeEditModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-customer-form>
    </b-modal>

    <!-- Delete Customer Modal -->
    <b-modal
      ref="delete-customer-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <delete-customer-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getCustomerData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></delete-customer-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import CustomerOverview from "@/components/CustomerOverview.vue";
import CreateCustomerForm from "@/components/CreateCustomerForm.vue";
import EditCustomerForm from "@/components/EditCustomerForm.vue";
import DeleteCustomerModal from "@/components/DeleteCustomerModal.vue";

export default {
  components: {
    CustomerOverview,
    CreateCustomerForm,
    EditCustomerForm,
    DeleteCustomerModal,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table

      fields: [
        {
          key: "company_name",
          label: "Company Name",
          sortable: false,
        },
        {
          key: "contact_name",
          label: "Contact Name",
          sortable: false,
        },
        {
          key: "contact_email",
          label: "Contact E-Mail",
          sortable: false,
        },
        {
          key: "customer_status",
          label: "Customer Status",
          sortable: false,
        },
        "actions",
      ],
      items: [],
      numberOfCustomers: 0,
      activeCustomers: 0,
      activeCustomersData: [],
      customerId: 0,
      companySearchTerm: "",
      tableHeader: "",
      showSuccessAlert: false,
      alertMessage: "",
    };
  },
  mounted() {
    this.getCustomerData();
  },
  methods: {
    showCreateModal() {
      this.$refs["create-customer-modal"].show();
    },
    closeCreateModal() {
      this.$refs["create-customer-modal"].hide();
    },
    getCustomerData() {
      axios
        .get("http://localhost:3000/customers/")
        .then((response) => {
          this.tableHeader = "Total Customer";
          this.items = response.data;
          this.numberOfCustomers = response.data.length;
          this.activeCustomersData = response.data.filter(
            (item) => item.customer_status === "active"
          );
          this.activeCustomers = this.activeCustomersData.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRowData(id) {
      this.$refs["edit-customer-modal"].show();
      this.customerId = id;
    },
    closeEditModal() {
      this.$refs["edit-customer-modal"].hide();
    },
    setFilterTotalIsActive() {
      this.tableHeader = "Total Customers";
      this.getCustomerData();
    },
    setFilterActiveIsActive() {
      this.tableHeader = "Active Customers";
      this.items = this.activeCustomersData;
    },
    showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Customer was created successfully!";
    },
    showAlertUpdate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Customer was updated successfully";
    },
    showDeleteModal(id) {
      this.$refs["delete-customer-modal"].show();
      this.customerId = id;
    },
    closeDeleteModal() {
      this.$refs["delete-customer-modal"].hide();
    },
    showDeleteSuccessModal() {
      this.showSuccessAlert = true;
      this.alertMessage = "Customer was deleted successfully!";
    },
  },
};
</script>

<style>
.action-item:hover {
  cursor: pointer;
}
</style>
And our CustomerOverview.vue component will look like this:
<template>
  <div>
    <b-row class="text-center">
      <b-col>
        <div
          class="filter-card p-3"
          :class="{
            'bg-active-filter': totalIsActive,
            'bg-light': !totalIsActive,
          }"
          @click="totalCustomersIsActiveFilter"
        >
          <h6>Total Customers</h6>
          <h4>
            <strong>{{ totalCustomers }}</strong>
          </h4>
        </div>
      </b-col>
      <b-col>
        <div
          class="filter-card p-3"
          :class="{
            'bg-active-filter': activeIsActive,
            'bg-light': !activeIsActive,
          }"
          @click="activeCustomersIsActiveFilter"
        >
          <h6 class="text-secondary">Active Customers</h6>
          <h4>
            <strong>{{ activeCustomers }}</strong>
          </h4>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "CustomerOverview",
  props: {
    totalCustomers: Number,
    activeCustomers: Number,
  },
  data() {
    return {
      totalIsActive: true,
      activeIsActive: false,
    };
  },
  methods: {
    totalCustomersIsActiveFilter() {
      this.totalIsActive = true;
      this.activeIsActive = false;
      this.$emit("totalCustomersIsActive");
    },
    activeCustomersIsActiveFilter() {
      this.totalIsActive = false;
      this.activeIsActive = true;
      this.$emit("activeCustomerIsActive");
    },
  },
};
</script>

<style>
.filter-card:hover {
  cursor: pointer;
  text-decoration: underline;
}

.bg-active-filter {
  background-color: #e9f1fe;
  color: #074297;
}
</style>
We also have three modals that are used to add new customers to our list, one for updating existing customers and one for removing existing records:
<!-- Modal for adding new customers -->
    <!-- Modal for adding new customers -->
    <b-modal
      ref="create-customer-modal"
      size="xl"
      hide-footer
      title="New Customer"
    >
      <create-customer-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertCreate"
      ></create-customer-form>
    </b-modal>

    <!-- Modal for updating customers -->
    <b-modal
      ref="edit-customer-modal"
      size="xl"
      hide-footer
      title="Edit Customer"
    >
      <edit-customer-form
        @closeEditModal="closeEditModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-customer-form>
    </b-modal>

<!-- Delete Customer Modal -->
    <b-modal
      ref="delete-customer-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <delete-customer-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getCustomerData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></delete-customer-modal>
    </b-modal>
As you can see, we are importing the forms themselves, meaning that we need to create a CreateCustomerForm.vue:
<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Contact Details</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group id="first-name" label="First Name" label-for="first-name">
          <b-form-input
            id="first-name"
            type="text"
            placeholder="First Name"
            v-model="customer.contact_firstname"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="last-name" label="Last Name" label-for="last-name">
          <b-form-input
            id="last-name"
            type="text"
            placeholder="Last Name"
            v-model="customer.contact_lastname"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="6">
        <b-form-group id="email" label="E-Mail" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="example@crm.com"
            v-model="customer.contact_email"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <h4 class="text-secondary">Company Details</h4>
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group
          id="company_name"
          label="Company Name"
          label-for="company_name"
        >
          <b-form-input
            id="company_name"
            type="text"
            placeholder="XYZ Industries"
            v-model="customer.company_name"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group
          id="acquired_on"
          label="Acquired On"
          label-for="acquired_on"
        >
          <b-form-input
            id="acquired_on"
            type="date"
            v-model="customer.acquired_on"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-form-checkbox
        id="customer_status"
        v-model="customer.customer_status"
        name="customer-status"
        value="active"
        unchecked-value="inactive"
      >
        Customer is active
      </b-form-checkbox>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="addNewCustomer"
          >Add Customer</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Close</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateCustomerModal",
  data() {
    return {
      customer: {},
    };
  },
  methods: {
    triggerClose() {
      this.$emit("closeCreateModal");
    },
    addNewCustomer() {
      axios
        .post("http://localhost:3000/customers/", this.customer)
        .then((response) => {
          console.log(response.data);
          this.$emit("closeCreateModal");
          this.$emit("reloadDataTable");
          this.$emit("showSuccessAlert");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
And EditCustomerForm.vue component:
<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Contact Details</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group id="first-name" label="First Name" label-for="first-name">
          <b-form-input
            id="first-name"
            type="text"
            placeholder="First Name"
            v-model="customer.contact_firstname"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="last-name" label="Last Name" label-for="last-name">
          <b-form-input
            id="last-name"
            type="text"
            placeholder="Last Name"
            v-model="customer.contact_lastname"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="6">
        <b-form-group id="email" label="E-Mail" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="example@crm.com"
            v-model="customer.contact_email"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <h4 class="text-secondary">Company Details</h4>
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group
          id="company_name"
          label="Company Name"
          label-for="company_name"
        >
          <b-form-input
            id="company_name"
            type="text"
            placeholder="XYZ Industries"
            v-model="customer.company_name"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group
          id="acquired_on"
          label="Acquired On"
          label-for="acquired_on"
        >
          <b-form-input
            id="acquired_on"
            type="date"
            v-model="customer.acquired_on"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-form-checkbox
        id="customer_status"
        v-model="customer.customer_status"
        name="customer-status"
        value="active"
        unchecked-value="inactive"
      >
        Customer is active
      </b-form-checkbox>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="updateCustomer"
          >Update Customer</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Close</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateCustomerModal",
  props: {
    customerId: Number,
  },
  data() {
    return {
      customer: {},
    };
  },
  mounted() {
    this.getCusomterByID();
  },
  methods: {
    triggerClose() {
      this.$emit("closeEditModal");
    },
    getCusomterByID() {
      axios
        .get(`http://localhost:3000/customers/${this.customerId}`)
        .then((response) => {
          this.customer = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCustomer() {
      axios
        .put(
          `http://localhost:3000/customers/${this.customerId}`,
          this.customer
        )
        .then((response) => {
          console.log(response.data);
          this.$emit("closeEditModal");
          this.$emit("reloadDataTable");
          this.$emit("showSuccessAlert");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
For our delete modal we will have a confirmation message, asking the user to confirm that the record needs to be deleted:
<template>
  <div>
    <b-row class="mt-2 mb-3">
      <h6 class="text-secondary">
        Are you sure you want to delete this customer from your CRM?
      </h6>
    </b-row>
    <b-row class="mt-2 mb-3">
      <p class="text-danger">
        This action is not reversible and may result in the loss if important
        data.
      </p>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <b-button variant="danger" @click="removeCustomerFromData"
          >Delete Customer</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Close</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DeleteCustomerModal",
  props: {
    customerId: Number,
  },
  methods: {
    triggerClose() {
      this.$emit("closeDeleteModal");
    },
    removeCustomerFromData() {
      axios
        .delete(`http://localhost:3000/customers/${this.customerId}`)
        .then(() => {
          this.$emit("reloadDataTable");
          this.$emit("showDeleteAlert");
          this.$emit("closeDeleteModal");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
The result will be:

Screenshot showing data table

By clicking on the "Active Customers" we can filter the table to include only those, that are currently active:

Data table with only active customers

This function is used to reset the items array to its original form where all customers are included:
setFilterTotalIsActive() {
      this.tableHeader = "Total Customers";
      this.getCustomerData();
}
This function is responsible for filtering out any customers that are not currently active:
setFilterActiveIsActive() {
      this.tableHeader = "Active Customers";
      this.items = this.activeCustomersData;
}
The activeCustomersData is returned from our data() function. The array is filled when the data is being requested from our backend:
getCustomerData() {
      axios
        .get("http://localhost:3000/customers/")
        .then((response) => {
          this.tableHeader = "Total Customer";
          this.items = response.data;
          this.numberOfCustomers = response.data.length;
          this.activeCustomersData = response.data.filter(
            (item) => item.customer_status === "active"
          ); //filters out any inactive customers
          this.activeCustomers = this.activeCustomersData.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
We are also conditionally rendering a green tag when the customer is active and a red one, when the customer is inactive:

Green tags against the red tags

This is done using the following:
          <b-table
            striped
            hover
            :items="items"
            :fields="fields"
            class="text-center"
          >
            <template #cell(contact_name)="data">
              {{
                `${data.item.contact_firstname} ${data.item.contact_lastname}`
              }}
            </template>
            <template #cell(customer_status)="data">
              <b-icon-bookmark-check-fill
                variant="success"
                v-if="data.item.customer_status === 'active'"
              ></b-icon-bookmark-check-fill>
              <b-icon-bookmark-x-fill
                variant="danger"
                v-else
              ></b-icon-bookmark-x-fill>
            </template>
            <template #cell(actions)="data">
              <b-row>
                <b-col cols="7">
                  <b-icon-pencil-square
                    class="action-item"
                    variant="primary"
                    @click="getRowData(data.item.id)"
                  ></b-icon-pencil-square>
                </b-col>
                <b-col cols="1">
                  <b-icon-trash-fill
                    class="action-item"
                    variant="danger"
                    @click="showDeleteModal(data.item.id)"
                  ></b-icon-trash-fill>
                </b-col>
              </b-row>
            </template>
          </b-table>
As you can see, if the data.item.customer_status is active, we render the <b-icon-bookmark-check-fill></b-icon-bookmark-check-fill> with a success variant. If the customer is inactive, we use the <b-icon-bookmark-x-fill></b-icon-bookmark-x-fill>with the danger variant.

We are using the template within our data table to be able to customise what is rendered inside our table.

We are also using this render our <b-icon-pencil-square></b-icon-pencil-square>-icon, our <b-icon-trash-fill></b-icon-trash-fill>-icon and to render the full name of our contact.

Create Functionality
We can simply click on the button with the label "New Customer" and fill out the form:

Adding a new customer modal

We can then hit "Add Customer" to store the data in our mock api database.

We now have a new entry in our table:

New entry added

We can see that we included the success message at the top, to inform the user that customer has been successfully added.

What happens is that our actions sends a post request to the backend with the data we want to store:
addNewCustomer() {
    axios
       .post("http://localhost:3000/customers/",this.customer)
        .then((response) => {
          console.log(response.data);
          this.$emit("closeCreateModal");
          this.$emit("reloadDataTable");
          this.$emit("showSuccessAlert");
        })
        .catch((error) => {
          console.log(error);
        });
    },
Now you may have noticed these this.$emit events. These allow us to send data from the child component (in this case the modal window) back to the parent (in this case the data table).

Here we are first closing the modal window by triggering the closeCreateModal() method, reloading the data and telling our parent component to render the alert.

These events are registered in our parent component:
<!-- Modal for adding new customers -->
    <b-modal
      ref="create-customer-modal"
      size="xl"
      hide-footer
      title="New Customer"
    >
      <create-customer-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertCreate"
      ></create-customer-form>
    </b-modal>
As you can see, the child component has the name of the string we place in the $emit.

That way Vue knows which event to look out for and when that event is registered, it knows which method to call next:
closeCreateModal() {
      this.$refs["create-customer-modal"].hide();
    },
    getCustomerData() {
      axios
        .get("http://localhost:3000/customers/")
        .then((response) => {
          this.tableHeader = "Total Customer";
          this.items = response.data;
          this.numberOfCustomers = response.data.length;
          this.activeCustomersData = response.data.filter(
            (item) => item.customer_status === "active"
          );
          this.activeCustomers = this.activeCustomersData.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Customer was created successfully!";
    },
Update Functionality
Now that we can create new customers, we can focus on editing the existing records.

This usually has two parts to it:

Identify and load the specific data of the record
Send the updated data to the backend for storage
So, we first need to identify the records. For that we have ids. They are unique to each record, which is exactly what we need.:
             <template #cell(actions)="data">
              <b-icon-pencil-square
                class="action-item"
                variant="primary"
                @click="getRowData(data.item.id)"
              ></b-icon-pencil-square>
            </template>
This is part of our data table and we again are using <template></template> to customise what is being rendered.

Here we are calling a function that will assign the id to a property returned by the data method:
getRowData(id) {
      this.$refs["edit-customer-modal"].show();
      this.customerId = id;
    },
We are using $refs to identify the modal we want to open. In this case we are using the edit-customer-modal. Think of $refs as a form of selector such as the id or class.

We are also passing the id of the element to our customerId to be used in our update call.

With the customerId we can now pass this to our child modal.

But how?

For this reason props exist:
<!-- Modal for updating customers -->
    <b-modal
      ref="edit-customer-modal"
      size="xl"
      hide-footer
      title="Edit Customer"
    >
      <edit-customer-form
        @closeEditModal="closeEditModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-customer-form>
    </b-modal>
We are passing our customerId with our stored id to a property with the same name. You can name it any way you want, but it happens that we have the same name here.

The syntax is :<prop name>="whatever you want to pass"

We now need to register this prop name in our modal component, to be able to use it:
  name: "CreateCustomerModal",
  props: {
    customerId: Number,
  },
In our export default, we can add this props-property to it, allowing us access to it within our child component.

With this in place, we can now make a request to our api and by supplying our id, we can get the specific record:
getCusomterByID() {
   axios
    .get(`http://localhost:3000/customers/${this.customerId}`)
    .then((response) => {
       this.customer = response.data;
     })
     .catch((error) => {
       console.log(error);
     });
    },
This will return the data we need to pre-fill the input fields with the current data stored:

Pre-filled form

Now let us change the E-Mail that is being used and then click on the update button to save the changes:

Screenshot of changed email

And this will then be reflected in our table:

Screenshot showing updated data in table

This is thanks to our axios request that sends the updated data to our api:
updateCustomer() {
      axios
        .put(
          `http://localhost:3000/customers/${this.customerId}`,
          this.customer
        )
        .then((response) => {
          console.log(response.data);
          this.$emit("closeEditModal");
          this.$emit("reloadDataTable");
          this.$emit("showSuccessAlert");
        })
        .catch((error) => {
          console.log(error);
        });
    },
We are using a the PUT Http-verb here to tell axios that we want to update a specific record with the data we define as the second argument.

We therefore also need to include the id of the record we want to update.

We again make use of our events to close the modal, reload the table to be able to see the changes happen and display our success message.

Delete Functionality
And last, but certainly not least we have our delete, identifiable by our trash can icon in red:

Trash can icon

When we click on it, the record will not be immediately deleted, but a prompt will appear, asking the user, if we want to permanently delete this record:

Delete confirmation modal

It is considered good usability practice to inform the user of any potential dangers their actions may have.

The modal appears thanks to our icon having a click-event attached to it:
<b-col cols="1">
                  <b-icon-trash-fill
                    class="action-item"
                    variant="danger"
                    @click="showDeleteModal(data.item.id)"
                  ></b-icon-trash-fill>
                </b-col>
Just as we did with the edit modal we also pass in the id of our item, which we will be needing for when we make our delete request:
<script>
import axios from "axios";

export default {
  name: "DeleteCustomerModal",
  props: {
    customerId: Number,
  },
  methods: {
    triggerClose() {
      this.$emit("closeDeleteModal");
    },
    removeCustomerFromData() {axios
 .delete(`http://localhost:3000/customers/${this.customerId}`)
        .then(() => {
          this.$emit("reloadDataTable");
          this.$emit("showDeleteAlert");
          this.$emit("closeDeleteModal");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
Here are basically again doing the same things we did in the previous examples.

We make our request when a user takes an action and then we emit a few events back to the parent data table component to close the modal, reload the data to reflect our changes and display the success alert.

Here we also have an option close the modal, which is why there is an additional method that emits and event in the case the user decides to take this route.

We are also using red text and a red background for our button to signal to the user that this is a very important action that may have negative consequences.

Once we confirm the deletion, we can again see the success alert informing us and can verify, that the record has been removed from the table:

Removed record from table

Conclusion
I hope you enjoyed this introduction to Vue. These points outlined above are not only applicable to Vue, be it 2.x or 3.x, but also to other Single-Page-Frameworks such as React, Angular or Svelte.

The concepts remain the same.

If you have been following along, you can have a look at see if you can simplify our DataTable.vue file by splitting it up into more components.

Let me know if there is anything that you would like to read about on this page.

Discussion (5)
Subscribe
pic
Add to the discussion
 
niloufarzd profile image
niloufar
•
Dec 13 '21

Do you have the source and project code?


1
 like
Reply
 
thesunofgod profile image
thesunofgod
•
Jul 12

Can you share the source code?


1
 like
Reply
 
anys profile image
anys
•
Mar 4

If I want to upload this tutorial to my git and share to public. is it ok @rjzauner ?


Like
Reply
 
rjzauner profile image
RoryJZauner 
•
Mar 4

Hey :) yes, no problem. Go for it!


2
 likes
Reply
 
anisreena profile image
anisreena
•
Jan 2

hello, do u have the source code?


Like
Reply
Code of Conduct • Report abuse
Read next
willholmes profile image
Multi Nested Dynamic Routes in NextJs
Will Holmes - Jul 20

sinedied profile image
A simpler and smaller Angular starter with ngLite
Yohan Lasorsa - Jul 29

rajeshroyal profile image
As a Interviewer what question you ask a dev while taking interview for react.js?
Rajesh Royal - Jul 28

iarchitsharma profile image
Top 3 Ways to Center a DIV with CSS 🚀
Archit Sharma - Jul 28


RoryJZauner
Follow
I love working on the frontend of a project, giving people the tools they need to harness the power of technology.
WORK
Full-Stack Developer
JOINED
Mar 30, 2021
More from RoryJZauner
Hugo vs Nuxt.js - A Blog-Off
#javascript #programming #career #vue
ASP.Net 5 Web API Basics with C#: A Tutorial
#uxengineering #csharp #codenewbie #tutorial
Getting started with Laravel 8, Vue 3 and Tailwind
#uxengineering #laravel #vue #javascript
<template>
  <div>
    <b-row>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        {{ alertMessage }}
      </b-alert>
    </b-row>
    <b-row>
      <customer-overview
        :totalCustomers="numberOfCustomers"
        :activeCustomers="activeCustomers"
        @totalCustomersIsActive="setFilterTotalIsActive"
        @activeCustomerIsActive="setFilterActiveIsActive"
      ></customer-overview>
    </b-row>
    <b-row class="mt-3">
      <b-card>
        <b-row align-h="between">
          <b-col cols="6">
            <h3>{{ tableHeader }}</h3>
          </b-col>
          <b-col cols="2">
            <b-row>
              <b-col>
                <b-button
                  variant="primary"
                  id="show-btn"
                  @click="showCreateModal"
                >
                  <b-icon-plus class="text-white"></b-icon-plus>
                  <span class="h6 text-white">New Customer</span>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-table
            striped
            hover
            :items="items"
            :fields="fields"
            class="text-center"
          >
            <template #cell(contact_name)="data">
              {{
                `${data.item.contact_firstname} ${data.item.contact_lastname}`
              }}
            </template>
            <template #cell(customer_status)="data">
              <b-icon-bookmark-check-fill
                variant="success"
                v-if="data.item.customer_status === 'active'"
              ></b-icon-bookmark-check-fill>
              <b-icon-bookmark-x-fill
                variant="danger"
                v-else
              ></b-icon-bookmark-x-fill>
            </template>
            <template #cell(actions)="data">
              <b-row>
                <b-col cols="7">
                  <b-icon-pencil-square
                    class="action-item"
                    variant="primary"
                    @click="getRowData(data.item.id)"
                  ></b-icon-pencil-square>
                </b-col>
                <b-col cols="1">
                  <b-icon-trash-fill
                    class="action-item"
                    variant="danger"
                    @click="showDeleteModal(data.item.id)"
                  ></b-icon-trash-fill>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-row>
      </b-card>
    </b-row>

    <!-- Modal for adding new customers -->
    <b-modal
      ref="create-customer-modal"
      size="xl"
      hide-footer
      title="New Customer"
    >
      <create-customer-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertCreate"
      ></create-customer-form>
    </b-modal>

    <!-- Modal for updating customers -->
    <b-modal
      ref="edit-customer-modal"
      size="xl"
      hide-footer
      title="Edit Customer"
    >
      <edit-customer-form
        @closeEditModal="closeEditModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-customer-form>
    </b-modal>

    <!-- Delete Customer Modal -->
    <b-modal
      ref="delete-customer-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <delete-customer-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getCustomerData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></delete-customer-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import CustomerOverview from "@/components/CustomerOverview.vue";
import CreateCustomerForm from "@/components/CreateCustomerForm.vue";
import EditCustomerForm from "@/components/EditCustomerForm.vue";
import DeleteCustomerModal from "@/components/DeleteCustomerModal.vue";

export default {
  components: {
    CustomerOverview,
    CreateCustomerForm,
    EditCustomerForm,
    DeleteCustomerModal,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table

      fields: [
        {
          key: "company_name",
          label: "Company Name",
          sortable: false,
        },
        {
          key: "contact_name",
          label: "Contact Name",
          sortable: false,
        },
        {
          key: "contact_email",
          label: "Contact E-Mail",
          sortable: false,
        },
        {
          key: "customer_status",
          label: "Customer Status",
          sortable: false,
        },
        "actions",
      ],
      items: [],
      numberOfCustomers: 0,
      activeCustomers: 0,
      activeCustomersData: [],
      customerId: 0,
      companySearchTerm: "",
      tableHeader: "",
      showSuccessAlert: false,
      alertMessage: "",
    };
  },
  mounted() {
    this.getCustomerData();
  },
  methods: {
    showCreateModal() {
      this.$refs["create-customer-modal"].show();
    },
    closeCreateModal() {
      this.$refs["create-customer-modal"].hide();
    },
    getCustomerData() {
      axios
        .get("http://localhost:3000/customers/")
        .then((response) => {
          this.tableHeader = "Total Customer";
          this.items = response.data;
          this.numberOfCustomers = response.data.length;
          this.activeCustomersData = response.data.filter(
            (item) => item.customer_status === "active"
          );
          this.activeCustomers = this.activeCustomersData.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRowData(id) {
      this.$refs["edit-customer-modal"].show();
      this.customerId = id;
    },
    closeEditModal() {
      this.$refs["edit-customer-modal"].hide();
    },
    setFilterTotalIsActive() {
      this.tableHeader = "Total Customers";
      this.getCustomerData();
    },
    setFilterActiveIsActive() {
      this.tableHeader = "Active Customers";
      this.items = this.activeCustomersData;
    },
    showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Customer was created successfully!";
    },
    showAlertUpdate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Customer was updated successfully";
    },
    showDeleteModal(id) {
      this.$refs["delete-customer-modal"].show();
      this.customerId = id;
    },
    closeDeleteModal() {
      this.$refs["delete-customer-modal"].hide();
    },
    showDeleteSuccessModal() {
      this.showSuccessAlert = true;
      this.alertMessage = "Customer was deleted successfully!";
    },
  },
};
</script>

<style>
.action-item:hover {
  cursor: pointer;
}
</style>
DEV Community — A constructive and inclusive social network for software developers. With you every step of your journey.

Built on Forem — the open source software that powers DEV and other inclusive communities.

Made with love and Ruby on Rails. DEV Community © 2016 - 2022.