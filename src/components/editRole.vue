<template>
  <div class="container p-3 mt-3 mb-3 border border-secondary rounded">
    <form @submit.prevent="submitForm">
      <input type="hidden" v-model="role.roleID" />
      <p>
        <label class="col-3" for="editRoleID">Role ID:</label>
        <input type="text" id="editRoleID" v-model="role.roleID" readonly="readonly" disabled />
      </p>
      <p>
        <label class="col-3" for="editRoleName">Role Name:</label>
        <input type="text" id="editRoleName" v-model="role.roleName" required />
      </p>
      <p>
        <label class="col-3" for="editDescription">Description:</label>
        <textarea id="editDescription" rows="3" v-model="role.description"></textarea>
      </p>
      <div class="form-group d-flex justify-content-start">
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-success">Save</button>
        </div>
        <div class="ml-3">
          <button type="button" class="btn btn-danger" @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      role: {
        roleID: '', 
        roleName: '', 
        description: ''
      }
    };
  },
  methods: {
    submitForm() {
      axios.put(`http://localhost:8000/roles/${this.role.roleID}`, this.role)
        .then(() => {
          this.$router.push('/managerole');
        })
        .catch(error => {
          console.error('Error saving role:', error);
        });
    },
    cancelEdit() {
      this.$router.push('/managerole');
    }
  },
  created() {
    const roleId = this.$route.params.id;
    axios.get(`http://localhost:8000/roles/${roleId}`)
      .then(response => {
        this.role = response.data;
      })
      .catch(error => {
        console.error('Error fetching role:', error);
      });
  }
};
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
