import { getDatabase, get, set, push, ref, child } from 'firebase/database'

export const storeTemplate = (
  template: Template,
  key: string | null
): string => {
  const db = getDatabase()
  const templateListRef = ref(db, 'templates')
  if (key == null || key === '') {
    const newTemplateRef = push(templateListRef)
    set(newTemplateRef, template)
    return newTemplateRef.key!
  } else {
    set(ref(db, `templates/${key}`), template)
    return key
  }
}

export const fetchTemplate = async (key: string): Promise<Template | null> => {
  if (typeof window === 'undefined') return null
  const dbRef = ref(getDatabase())
  try {
    const snapshot = await get(child(dbRef, `templates/${key}`))
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
