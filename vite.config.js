import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{
  //   proxy:{
  //     "/api":"http://116.202.210.102:6000",
  //   }
  // }
})
