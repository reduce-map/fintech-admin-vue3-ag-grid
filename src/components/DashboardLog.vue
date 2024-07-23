<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ChatMessage {
  id: number
  time: Date
  text: string
}

const loading = ref(true)
const loadingMore = ref(false)
const chatMessages = ref<ChatMessage[]>([])
const error = ref<string | null>(null)
let lastMessageId = 0

const generateMockMessages = (count: number): ChatMessage[] => {
  const messages: ChatMessage[] = []
  for (let i = 0; i < count; i++) {
    messages.push({
      id: lastMessageId++,
      time: new Date(Date.now() - lastMessageId * 60000), // каждое сообщение на минуту раньше предыдущего
      text: `Test message ${lastMessageId} lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    })
  }
  return messages
}

const fetchChatMessages = async () => {
  try {
    loading.value = true
    error.value = null
    setTimeout(() => {
      chatMessages.value = generateMockMessages(20)
      loading.value = false
    }, 1000)
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'message' in err) {
      error.value = (err as { message: string }).message
    } else {
      error.value = 'Unknown error'
    }

    loading.value = false
  }
}

const fetchMoreChatMessages = async () => {
  try {
    loadingMore.value = true
    error.value = null
    setTimeout(() => {
      chatMessages.value = [...chatMessages.value, ...generateMockMessages(10)]
      loadingMore.value = false
    }, 1000)
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'message' in err) {
      error.value = (err as { message: string }).message
    } else {
      error.value = 'Unknown error'
    }

    loadingMore.value = false
  }
}

onMounted(() => {
  fetchChatMessages()
})
</script>

<template>
  <h3 class="mb-4">Log</h3>
  <div v-if="loading" class="content-center">
    <Spin size="large" />
  </div>
  <div v-else>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <Timeline>
        <TimelineItem v-for="message in chatMessages" :key="message.id">
          <p class="time">{{ message.time.toLocaleString() }}</p>
          <p v-line-clamp="2" class="content">{{ message.text }}</p>
        </TimelineItem>
      </Timeline>
      <div class="content-center">
        <Spin v-if="loadingMore" size="large" />
        <Button v-else type="dashed" @click="fetchMoreChatMessages">Load more</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time {
  font-size: 14px;
  font-weight: bold;
}

.content {
  padding-left: 5px;
}

.error {
  color: red;
}
</style>
