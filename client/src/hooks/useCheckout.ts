import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { IOrderItem } from '@/shared/types/orderItem.interface'
import { useAppDispatch } from './redux'
import { useCreateMutation } from '@/services/orderService'

export const useCheckout = () => {
    const router = useRouter()
    const items: IOrderItem[] = [{  //TODO: replace with actual data
        id: '1',
        quantity: 2,
        price: 100,
        product: {
            id: '1',
            name: 'Product 1',
            price: 100,
            images: ['/images/product1.jpg'],
            description: 'Product 1',
            categoryId: '1',
        },
    }]

    // const { reset } = useAppDispatch()   //TODO: добавить метод reset в orderSlice

    const [mutate, { isLoading, isError, isSuccess }] = useCreateMutation()

    const handleCreateOrder = async () => {
        const response = await mutate({
            items: items.map(item => ({
                price: item.price,
                quantity: item.quantity,
                productId: item.product.id
            }))
        }).unwrap()

        if (isSuccess) {
            // reset()
            router.push(response.confirmation.confirmation_url)
        }
        if (isError) toast.error('Ошибка при создании платежа')
    }

    return {handleCreateOrder, isLoading}

}
