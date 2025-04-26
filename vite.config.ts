import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	base: '/massive-todo/',
	plugins: [react()],
	build: {
		sourcemap: process.env.NODE_ENV !== 'production',
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
				},
			},
		},
	},
	resolve: {
		alias: {
			'@shared': path.resolve(__dirname, './src/shared'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@features': path.resolve(__dirname, './src/features')
		},
	},
})