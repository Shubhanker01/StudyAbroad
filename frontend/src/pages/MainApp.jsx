import React from 'react'
import { SidebarProvider,SidebarTrigger } from '../components/ui/sidebar'
import { Outlet, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
function MainApp() {
    const { userId } = useParams()
    return (
        <SidebarProvider>
            <Navbar userId={userId} />
            <div className="min-h-screen flex bg-zinc-950 text-zinc-100 px-6 py-5 w-full">

                <SidebarTrigger className="m-4" />
                {/* Content */}
                <main className="flex-1 justify-center md:p-6 p-3 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}

export default MainApp