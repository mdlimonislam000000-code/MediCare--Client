import DashboardSideber from "@/components/DashboardSideber";



const Layout = ({ children }) => {


    return (
        <div className='min-h-screen flex gap-3 container mx-auto bg-background text-foreground'>
    
            <DashboardSideber />

            <main className='flex-1 p-6 overflow-y-auto'>
                {children}
            </main>
        </div>
    );
};

export default Layout;