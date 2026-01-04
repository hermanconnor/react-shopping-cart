import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import type { CartItem } from '@/types';

interface Props {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
  total: number;
}

export function CartSheet({
  cart,
  isOpen,
  onClose,
  onRemove,
  onClearCart,
  total,
}: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='flex w-full flex-col sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cart.length === 0
              ? 'Your cart is empty'
              : `${cart.length} item${cart.length !== 1 ? 's' : ''} in cart`}
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className='flex flex-1 items-center justify-center'>
            <div className='text-center'>
              <p className='text-muted-foreground'>
                Add some items to get started
              </p>
            </div>
          </div>
        ) : (
          <div className='px-4'>
            <ul className='max-h-60 overflow-y-auto divide-y divide-gray-200'>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className='flex justify-between items-center py-2'
                >
                  <div className='space-x-1'>
                    <h4 className='font-semibold'>{item.name}</h4>
                    <p className='text-sm text-gray-500'>
                      <span className='text-sm text-gray-500'>
                        {item.quantity}
                      </span>{' '}
                      x ${item.price}
                    </p>
                  </div>
                  <Button
                    variant='destructive'
                    className='text-sm hover:underline cursor-pointer'
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>

            <Separator className='my-4' />

            <div className='flex justify-between mt-4 font-semibold'>
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <Button
              variant='destructive'
              size='lg'
              className='w-full cursor-pointer mt-4'
              onClick={onClearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
