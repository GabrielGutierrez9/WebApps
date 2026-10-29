import { useState } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function FetchDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadPosts() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Fetch in React</h1>
      <p>This example shows how a component uses <code>fetch</code> to load data from an API.</p>

      <button onClick={loadPosts} disabled={loading} style={{ marginBottom: '1rem' }}>
        {loading ? 'Loading...' : 'Fetch Posts'}
      </button>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {!loading && posts.length === 0 && !error && <p>No posts loaded yet.</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '1rem' }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
