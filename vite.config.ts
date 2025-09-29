import { defineConfig,loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode,".",'')
  return{
    plugins: [react()],
    optimizeDeps: {
      include: ["antd/es/select"]
    },
    build: {
      outDir: env.VITE_RELAYAPP_ADDRESS || "dist", 
      emptyOutDir: true          
    }
  }
})
