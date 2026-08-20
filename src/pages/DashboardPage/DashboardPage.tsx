import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';

function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="min-w-0 flex-1">
                <DashboardHeader />

                <section className="p-6 lg:p-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Welcome back 👋
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Manage and track your shortened URLs.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default DashboardPage;