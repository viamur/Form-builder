import { FormElement } from '@/components/fields/FormElements';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps, useEffect } from 'react';
import useBuilderFormContext from '@/hooks/useBuilderFormContext';
import { Input } from '@/components/ui/input';
import { CustomInstance } from './TitleField';
import * as FormComponents from '../../ui/form';

export const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
});

type PropertiesType = z.infer<typeof propertiesSchema>;

type Props = ComponentProps<FormElement['propertiesComponent']>;

export default function PropertiesComponent({ elementInstance }: Props) {
    const { updateElement } = useBuilderFormContext();

    const element = elementInstance as CustomInstance;
    const form = useForm<PropertiesType>({
        defaultValues: element.extraAttributes,
        resolver     : zodResolver(propertiesSchema),
        mode         : 'onBlur',
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [form, element]);

    function submit(data: PropertiesType) {
        const { title } = data;
        updateElement(element.id, {
            ...element,
            extraAttributes: { title },
        });
    }

    return (
        <FormComponents.Form {...form}>
            <form
                className="space-y-3"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                onBlur={form.handleSubmit(submit)}
            >
                <FormComponents.FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <FormComponents.FormLabel>Title</FormComponents.FormLabel>
                            <FormComponents.FormControl>
                                <Input
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.currentTarget.blur();
                                        }
                                    }}
                                />
                            </FormComponents.FormControl>
                            <FormComponents.FormMessage />
                        </FormComponents.FormItem>
                    )}
                />
            </form>
        </FormComponents.Form>
    );
}
