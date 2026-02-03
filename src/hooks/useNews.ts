import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { NewsArticle } from '../types';
import { MOCK_NEWS } from '../data/mockNews';

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If Firebase config is not yet set up, fallback to MOCK_NEWS
    // This allows the app to run even without valid keys initially
    try {
      const q = query(
        collection(db, 'articles'),
        orderBy('timestamp', 'desc'),
        limit(20)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs: NewsArticle[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() } as NewsArticle);
        });
        
        // Only set articles if we actually got results from Firebase
        if (docs.length > 0) {
          setArticles(docs);
        } else {
          // Fallback to mock data if collection is empty
          setArticles(MOCK_NEWS);
        }
        setLoading(false);
      }, (err) => {
        console.error("Firestore error:", err);
        setError(err);
        setArticles(MOCK_NEWS); // Fallback on error
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("Firebase initialization skipped or failed. Using mock data.");
      setArticles(MOCK_NEWS);
      setLoading(false);
    }
  }, []);

  return { articles, loading, error };
}
