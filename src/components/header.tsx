import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/providers/cart-provider';
import { CartSheet } from './cart-sheet';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const { cart, removeFromCart, clearCart } = useCart();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <header className='bg-white shadow-md py-4 px-6 flex items-center justify-between'>
      <div className='text-2xl font-bold text-blue-600'>ShopMate</div>

      <Button
        variant='outline'
        size='icon'
        className='relative bg-transparent cursor-pointer'
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className='size-5' />
        {cartItemCount > 0 && (
          <Badge className='absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
            {cartItemCount}
          </Badge>
        )}
      </Button>

      <CartSheet
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        total={Number(total)}
        onRemove={removeFromCart}
        onClearCart={clearCart}
      />
    </header>
  );
};

export default Header;
