import React from 'react';
import CartSummary from './CartSummary.tsx';
import Item from './Item.tsx';

const CartInfo: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center h-auto p-10 bg-gray-100">
            <h1 className="w-full mb-6 text-3xl font-semibold">My Cart</h1>
            <div className='flex flex-col w-full h-auto lg:flex-row'>
                <div className='flex flex-col  items-start lg:w-[60%] w-[100%] gap-4 h-auto '>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
                <div className='flex flex-col items-center lg:w-[40%] w-[100%] lg:p-0 py-10  h-auto '>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default CartInfo;
