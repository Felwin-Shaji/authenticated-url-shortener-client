import { useState, type FormEvent } from 'react';
import type { UrlResponse } from '../../../types/url';
import { createShortUrl } from '../../../services/urlService';

interface CreateUrlFormProps {
  onCreated: (url: UrlResponse) => void;
}

function CreateUrlForm({ onCreated }: CreateUrlFormProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!originalUrl.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const newUrl = await createShortUrl({ originalUrl: originalUrl.trim() });
      onCreated(newUrl);
      setOriginalUrl('');
    } catch {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Shorten a URL</h2>
      <p className="mt-1 text-sm text-slate-500">Enter a long URL to create a trackable short link.</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          required
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          disabled={isSubmitting}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={isSubmitting || !originalUrl.trim()}
          className="rounded-lg bg-blue-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Shorten'}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}

export default CreateUrlForm;