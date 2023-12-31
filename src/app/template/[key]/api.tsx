import { cache } from 'react'
import { fetchTemplate } from '@/components/firebase/firebase'
import { getFirebaseApp } from '@/lib/firebase/firebase'

export const fetchCacheTemplate = cache(
  async (key: string): Promise<Template | null> => {
    getFirebaseApp()
    return await fetchTemplate(key)
  }
)
