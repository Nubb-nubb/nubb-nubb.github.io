import { ref } from 'vue'

const titles = [
  "I'm in such a chinese era of my life",
  'Can someone please help edit my resume?',
  "I'm still bronze in valorant",
  "I'm still gold in league of legends",
  'I make origami balls at work',
]

const subtitles = [
  'i once had over 3 million caseoh channel points',
  'hey meta, take his drawls off',
  'i have acid reflux when i drink coffee :(',
  'my favorite gummies are meta mucil gummies',
  'ballrightttttt',
]

// Shared reactive state
const randomTitle = ref(titles[Math.floor(Math.random() * titles.length)])
const randomSubtitle = ref(subtitles[Math.floor(Math.random() * subtitles.length)])

function randomize() {
  randomTitle.value = titles[Math.floor(Math.random() * titles.length)]
  randomSubtitle.value = subtitles[Math.floor(Math.random() * subtitles.length)]
}

export function useRandomTitles() {
  return {
    randomTitle,
    randomSubtitle,
    randomize,
  }
}
