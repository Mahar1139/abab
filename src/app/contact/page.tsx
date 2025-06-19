// This file is obsolete and can be safely deleted.
// The Contact Us page functionality has been removed.
// All links previously pointing to /contact have been updated to point to /admissions.

export default function ObsoleteContactPage() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Page Not Available</h1>
      <p>The Contact Us page has been removed.</p>
      <p>For inquiries, please visit our <a href="/admissions" className="text-primary hover:underline">Admissions Page</a>.</p>
    </div>
  );
}
