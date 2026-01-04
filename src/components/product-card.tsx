import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/providers/cart-provider';
import type { Product } from '../types';
import { Button } from './ui/button';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <Card className='bg-white rounded-lg shadow p-4 pt-0'>
      <img
        src={product.image}
        alt={product.name}
        className='h-auto max-w-full rounded mb-4'
      />
      <CardContent className='flex-1'>
        <div className='mb-2'>
          <h2 className='text-xl font-semibold'>{product.name}</h2>
          <p className='text-gray-500 text-sm'>{product.description}</p>
        </div>

        <p className='font-bold text-lg'>${product.price.toFixed(2)}</p>
      </CardContent>

      <Button className='cursor-pointer' onClick={() => addToCart(product)}>
        Add To Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
