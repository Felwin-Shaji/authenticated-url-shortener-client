import { useEffect, useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import CreateUrlForm from './components/CreateUrlForm';
import { getUrls } from '../../services/urlService';
import type { UrlResponse, PaginationMeta } from '../../types/url';

const PAGE_LIMIT = 5;

function DashboardPage() {
  const [urls, setUrls] = useState<UrlResponse[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [recentUrl, setRecentUrl] = useState<UrlResponse | null>(null);

  const fetchUrls = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getUrls(page, PAGE_LIMIT);
      setUrls(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error('Failed to fetch URLs', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls(currentPage);
  }, [fetchUrls, currentPage]);

  const handleUrlCreated = (url: UrlResponse) => {
    setRecentUrl(url);
    if (currentPage === 1) {
      fetchUrls(1);
    } else {
      setCurrentPage(1); // Triggers re-fetch for page 1
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <DashboardHeader />

        <section className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
          {/* URL Create Form */}
          <CreateUrlForm onCreated={handleUrlCreated} />

          {/* Success Banner */}
          {recentUrl && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Link Created!</p>
              <a
                href={recentUrl.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-semibold text-emerald-900 underline"
              >
                {recentUrl.shortUrl}
              </a>
              <p className="mt-1 truncate text-xs text-slate-500">{recentUrl.originalUrl}</p>
            </div>
          )}

          {/* Paginated List */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Your URLs</h2>
            </div>

            {isLoading ? (
              <div className="px-6 py-12 text-center text-sm text-slate-500">Loading URLs...</div>
            ) : urls.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-slate-500">No URLs found. Create one above!</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {urls.map((url) => (
                  <div key={url.id} className="flex flex-col justify-between gap-2 px-6 py-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-900 hover:underline"
                      >
                        {url.shortUrl}
                      </a>
                      <p className="truncate text-sm text-slate-500">{url.originalUrl}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {url.clicks} clicks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                <p className="text-sm text-slate-600">
                  Page <span className="font-semibold">{meta.currentPage}</span> of{' '}
                  <span className="font-semibold">{meta.totalPages}</span>
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!meta.hasPrevPage}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={!meta.hasNextPage}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;