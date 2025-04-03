import { PUBLIC_URL } from "@/config/url.config";
import { useLoginMutation, useRegisterMutation } from "@/services/authService";
import { IAuthInput } from "@/shared/types/auth.interface";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function useAuthForm(isReg: boolean) {
    const router = useRouter();

    const form = useForm<IAuthInput>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    // Вызываем оба хука безусловно
    const [registerMutation, registerResult] = useRegisterMutation({ fixedCacheKey: 'login&register' });
    const [loginMutation, loginResult] = useLoginMutation({ fixedCacheKey: 'login&register' });

    // Определяем, какой мутацией пользоваться
    const mutate = isReg ? registerMutation : loginMutation;
    const result = isReg ? registerResult : loginResult;


    const onSubmit: SubmitHandler<IAuthInput> = async (data) => {
        try {
            await mutate(data).unwrap()
        } catch (error) {
            console.error("Ошибка авторизации:", error);
        }
    };

    // Используем useEffect для обработки успешного результата
    useEffect(() => {
        if (result.isSuccess) {
            form.reset()
            router.push(PUBLIC_URL.home());
            toast.success('Успешная авторизация')
        }
    }, [result.isSuccess, router, form]);

    useEffect(() => {
        if (result.isError) {
            toast.error('Ошибка авторизации');
        }
    }, [result.isError]);

    return { onSubmit, form, isLoading: result.isLoading }
}

