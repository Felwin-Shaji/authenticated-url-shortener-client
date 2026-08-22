import { useAppSelector } from '../../../store/hooks';

function DashboardHeader() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Dashboard
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                    Overview
                </h2>
            </div>

            <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-900">
                    {user?.username}
                </p>

                <p className="text-xs text-slate-500">
                    {user?.email}
                </p>
            </div>
        </header>
    );
}

export default DashboardHeader;