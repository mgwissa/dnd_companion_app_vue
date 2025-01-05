<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const { notes } = storeToRefs(userStore)

const filteredNotes = ref(notes.value)

const getFilteredNotes = (date) => {
  return filteredNotes.value.filter((note) => note.date === date)
}

watch(notes, () => {
  filterNotes(document.querySelector('#search').value)
})

watch(filteredNotes, () => {
  uniqueDates.value = [...new Set(filteredNotes.value.map((group) => group.date))]
})

const filterNotes = (searchTerm) => {
  filteredNotes.value = notes.value.filter((note) =>
    note.body.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
let uniqueDates = ref([...new Set(filteredNotes.value.map((group) => group.date))])

const addNote = () => {
  const note = {
    id: userStore.notes.length + 1,
    body: document.querySelector('#note').value,
    date: new Date().toLocaleDateString()
  }
  userStore.addNote(note)
  document.querySelector('#note').value = ''
}
</script>

<template>
  <div class="notes-container">
    <h1>Notes</h1>
    <label for="note">Add A Note:</label>
    <textarea class="note-input" id="note"></textarea>
    <button @click="addNote">Add Note</button>
    <div>
      <h2>Search:</h2>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        @input="(event) => filterNotes(event.target.value)"
      />
    </div>
    <div>
      <ul>
        <li v-for="date in uniqueDates" :key="date.id">
          <h3>{{ date }}</h3>
          <ul>
            <li v-for="note in getFilteredNotes(date)" :key="note.id">
              <p>{{ note.body }}</p>
            </li>
          </ul>
        </li>
        <li>
          <p>King Gollip the 19th - King of Downfall</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.notes-container {
  margin: 0 auto;
  width: 100%;
  max-width: 1220px;
}
</style>
