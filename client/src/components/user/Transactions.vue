<template>
  <div>
    <b-table
      striped
      show-empty
      empty-text="No Transactions Currently"
      hover
      :items="transactions"
      :fields="fields"
    >
      <template #cell(from)="row">
        {{
          row.item.from.slice(0, 5) +
          "....." +
          row.item.from.substring(30, row.item.from.length - 1)
        }}
      </template>
      <template #cell(to)="row">
        {{
          row.item.to.slice(0, 5) +
          "....." +
          row.item.to.substring(30, row.item.to.length - 1)
        }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { f_name: "", l_name: "", email: "", password: "" },
      fields: ["land_id", "from", "to"],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
  methods: {
    launchModal(data) {
      console.log(data);
    },
    submitForm(e) {},
  },
  computed: {
    transactions() {
      return this.$store.state.BChain.my_transactions.map((i) => {
        return {
          from: i[0],
          to: i[1],
          land_id: i[2],
        };
      });
    },
  },
};
</script>