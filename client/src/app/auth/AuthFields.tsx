import { UseFormReturn } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { validEmail } from '@/shared/regex'
import { IAuthInput } from '@/shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthInput, any, undefined>
	isLoading: boolean
	isReg?: boolean
}

export function AuthFields({
	form,
	isLoading,
	isReg = false
}: AuthFieldsProps) {
	return (
		<>
			{isReg && (
				<FormField
					control={form.control}
					name='name'
					rules={{
						required: 'Имя обязательно'
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="text"
									placeholder='Иван'
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'Почта обязательна',
					pattern: {
						value: validEmail,
						message: 'Введите валидную почту'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='ivan@examle.com'
								type='email'
								disabled={isLoading}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Минимум 6 символов'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='******'
								type='password'
								disabled={isLoading}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
