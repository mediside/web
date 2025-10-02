import { createStore } from 'effector'

export const $currentCollectionId = createStore<string | null>(null)
