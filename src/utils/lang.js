export function getLanguage() {
  if (typeof window === 'undefined') return 'id'
  const lang = navigator.language || navigator.userLanguage || ''
  if (lang.startsWith('id')) return 'id'
  return 'en'
}
