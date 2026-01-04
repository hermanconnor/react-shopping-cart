import ProductCard from './product-card';
import { useProducts } from '@/providers/product-provider';

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <div className='error'>❌ {error}</div>;

  if (!products || products.length === 0) {
    return <p>There are no products</p>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
