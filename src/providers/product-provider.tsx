import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getProducts } from '../services/api-service';
import type { Product } from '../types';

interface ProductContextType {
  products: Product[] | undefined;
  error: string | undefined;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore: boolean = false;

    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        if (!ignore) {
          setProducts(data);
          setError(undefined);
        }
      } catch (error) {
        if (!ignore) {
          console.error('Fetch error:', error);

          if (error instanceof Error) {
            setError(error.message);
            setProducts(undefined);
          } else {
            setError('Error fetching products');
            setProducts(undefined);
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      products,
      error,
      loading,
    }),
    [products, error, loading],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};
