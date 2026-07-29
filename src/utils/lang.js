let cachedLang = null

export async function detectLanguage() {
  if (cachedLang) return cachedLang
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('https://ip-api.com/json/?fields=countryCode', { signal: controller.signal })
    clearTimeout(timeout)
    const data = await res.json()
    cachedLang = data.countryCode === 'ID' ? 'id' : 'en'
  } catch {
    const fallback = navigator.language || ''
    cachedLang = fallback.startsWith('id') ? 'id' : 'en'
  }
  return cachedLang
}

export function getLanguage() {
  if (cachedLang) return cachedLang
  const fallback = navigator.language || ''
  return fallback.startsWith('id') ? 'id' : 'en'
}
