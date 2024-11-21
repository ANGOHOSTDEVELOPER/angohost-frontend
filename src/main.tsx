import ReactDOM from 'react-dom/client'
import 'rsuite/dist/rsuite.min.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes.tsx'
import "./styles/styles.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TailSpin } from 'react-loader-spinner';
import Snowfall from 'react-snowfall'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!)?.render(
    <>
        <QueryClientProvider client={queryClient}>
        <Snowfall />
            <RouterProvider router={router}
                fallbackElement={<TailSpin width={20} color='#222' />}
            />
        </QueryClientProvider>
    </>
)
