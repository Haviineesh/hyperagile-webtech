<template>
  <div id="app" class="container">
    <h3>Team members:</h3>
    <li>Haviineesh A/L Hariharan A22EC8004</li>
    <li>Muhd Izat Aiman A22EC0217</li>
    <li>Teenesh A/L Subramaniam A22EC5013</li>
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <h1>Contact List</h1>
    <ul v-if="contacts.length" class="contact-list">
      <li v-for="contact in contacts" :key="contact.id" class="contact-item">
        <span class="contact-name">{{ contact.name }}</span> -
        <span class="contact-phone">{{ contact.phone }}</span> -
        <span class="contact-email">{{ contact.email }}</span>
        <button @click="deleteContact(contact.id)" class="delete-button">Delete</button>
      </li>
    </ul>
    <p v-else class="no-contacts">No contacts found.</p>
    <form @submit.prevent="getContacts" class="get-contacts-form">
      <button type="submit" class="get-contacts-button">Get Contacts</button>
    </form>
    <form @submit.prevent="addContact" class="add-contact-form">
      <label for="name" class="add-contact-label">Name:</label>
      <input type="text" id="name" v-model="newContact.name" required class="add-contact-input">
      <label for="phone" class="add-contact-label">Phone:</label>
      <input type="tel" id="phone" v-model="newContact.phone" required class="add-contact-input">
      <label for="email" class="add-contact-label">Email:</label>
      <input type="email" id="email" v-model="newContact.email" required class="add-contact-input">
      <button type="submit" class="add-contact-button">Add Contact</button>
    </form>
  </div>
</template>





<script>
export default {
  name: 'App',
  data() {
    return {
      contacts: [],
      newContact: {
        name: '',
        phone: '',
        email: '',
      },
    };
  },
  methods: {
    getContacts() {
      fetch('http://localhost:3000/contacts')
        .then(response => response.json())
        .then(data => {
          this.contacts = data;
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
          // Handle errors gracefully (e.g., display an error message)
        });
    },
    addContact() {
      fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newContact),
      })
        .then(response => response.json())
        .then(data => {
          // Assuming the JSON Server assigns an ID automatically:
          this.newContact.id = data.id; // Add the assigned ID
          this.contacts.push(this.newContact);
          this.newContact = { name: '', phone: '', email: '' }; // Reset the form
        })
        .catch(error => {
          console.error('Error adding contact:', error);
          // Handle errors gracefully (e.g., display an error message)
        });
    },
    deleteContact(id) {
      fetch(`http://localhost:3000/contacts/${id}`, { method: 'DELETE' })
        .then(() => {
          const index = this.contacts.findIndex(contact => contact.id === id);
          this.contacts.splice(index, 1);
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
          // Handle errors gracefully (e.g., display an error message)
        });
    },
  },
  mounted(){
    this.getContacts();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  /* Center the app horizontally */
  padding: 20px;
  max-width: 800px;
  /* Limit the app's width */
}

.logo {
  display: block;
  margin: 0 auto 20px;
  /* Center and add some bottom margin */
  width: 100px;
  /* Set a fixed width for the logo */
}

.contact-list {
  list-style: none;
  /* Remove default bullet points */
  padding: 0;
  margin: 0;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  /* Distribute items horizontally */
  align-items: center;
  /* Align items vertically */
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.contact-name,
.contact-phone,
.contact-email {
  font-weight: bold;
  margin-right: 10px;
}

.delete-button {
  border: none;
  background-color: transparent;
  color: #999;
  cursor: pointer;
  padding: 0;
}

.get-contacts-form,
.add-contact-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.get-contacts-button,
.add-contact-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.add-contact-label {
  margin-bottom: 5px;
}

.add-contact-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.no-contacts {
  text-align: center;
  /* Center the text */
  color: #ccc;
  /* Set a light gray color */
  font-size: 16px;
  /* Increase font size slightly */
  margin-bottom: 20px;
  /* Add some bottom margin */
}
</style>
