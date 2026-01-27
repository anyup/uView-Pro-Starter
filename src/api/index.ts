import { http } from 'uview-pro'

export function getDemoData() {
  return http.get('/demo.json')
}
