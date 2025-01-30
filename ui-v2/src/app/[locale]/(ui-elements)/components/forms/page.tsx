'use client'
import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'

import { format } from 'date-fns'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
const items = [
	{
		id: 'recents',
		label: 'Recents'
	},
	{
		id: 'home',
		label: 'Home'
	},
	{
		id: 'applications',
		label: 'Applications'
	},
	{
		id: 'desktop',
		label: 'Desktop'
	},
	{
		id: 'downloads',
		label: 'Downloads'
	},
	{
		id: 'documents',
		label: 'Documents'
	}
] as const

const FormSchema = z.object({
	items: z
		.array(z.string())
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.'
		})
})

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.'
	})
})

const FormSchema2 = z.object({
	dob: z.date({
		required_error: 'A date of birth is required.'
	})
})

export default function FormPage() {
	const t = useTranslations()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: ''
		}
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	// form 2
	const form2 = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: ['recents', 'home']
		}
	})

	function onSubmit2(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			)
		})
	}

	// form 3
	const form3 = useForm<z.infer<typeof FormSchema2>>({
		resolver: zodResolver(FormSchema2)
	})

	function onSubmit3(data: z.infer<typeof FormSchema2>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			)
		})
	}
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.forms')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.forms')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8"
							>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} />
											</FormControl>
											<FormDescription>
												This is your public display name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Submit</Button>
							</form>
						</Form>

						<Form {...form}>
							<form
								onSubmit={form2.handleSubmit(onSubmit2)}
								className="space-y-8"
							>
								<FormField
									control={form2.control}
									name="items"
									render={() => (
										<FormItem>
											<div className="mb-4">
												<FormLabel className="text-base">
													Sidebar
												</FormLabel>
												<FormDescription>
													Select the items you want to display in the
													sidebar.
												</FormDescription>
											</div>
											{items.map((item) => (
												<FormField
													key={item.id}
													control={form2.control}
													name="items"
													render={({ field }) => {
														return (
															<FormItem
																key={item.id}
																className="flex flex-row items-start space-x-3 space-y-0"
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(
																			item.id
																		)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																						...field.value,
																						item.id
																					])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== item.id
																						)
																					)
																		}}
																	/>
																</FormControl>
																<FormLabel className="text-sm font-normal">
																	{item.label}
																</FormLabel>
															</FormItem>
														)
													}}
												/>
											))}
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Submit</Button>
							</form>
						</Form>
					</div>
				</div>

				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.forms')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<Form {...form}>
							<form
								onSubmit={form3.handleSubmit(onSubmit3)}
								className="space-y-8"
							>
								<FormField
									control={form3.control}
									name="dob"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Date of birth</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-[240px] pl-3 text-left font-normal',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value ? (
																format(field.value, 'PPP')
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto p-0"
													align="start"
												>
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) =>
															date > new Date() ||
															date < new Date('1900-01-01')
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormDescription>
												Your date of birth is used to calculate your age.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Submit</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
