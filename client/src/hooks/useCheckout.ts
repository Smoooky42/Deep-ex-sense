'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAppDispatch } from './redux'
import { useCreateOrderMutation } from '@/services/orderService'
import { useOrderItems } from './useOrderItems'
import { reset } from '@/store/reducers/orderItemSlice'

export const useCheckout = () => {
    const router = useRouter()
    const {items} = useOrderItems()
    const dispatch = useAppDispatch()

    const [mutate, { isLoading}] = useCreateOrderMutation()

    const handleCreateOrder = async () => {
        const response = await mutate({
            items: items.map(item => ({
                price: item.price,
                quantity: item.quantity,
                productId: item.product.id
            }))
        }).unwrap()
        .then(res => {
            if (res?.confirmation?.confirmation_url) {    
                dispatch(reset())
                router.push(res.confirmation.confirmation_url)
            }
        })
        .catch(err => {
            toast.error('Ошибка при создании платежа')
        })
    }

    return {handleCreateOrder, isLoading}
}
