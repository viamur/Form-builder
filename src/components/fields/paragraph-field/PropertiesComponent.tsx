import { FormElement } from '@/components/form-builder/fields/FormElements';
import { CustomInstance } from './ParagraphField';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps, useEffect } from 'react';
import useDesigner from '@/hooks/useDesigner';
import * as FormComponents from '../../../ui/form';
import { Textarea } from '@/components/ui/textarea';

export const propertiesSchema = z.object({
    text: z.string().min(2).max(500)
});

type PropertiesType = z.infer<typeof propertiesSchema>;

type Props = ComponentProps<FormElement['propertiesComponent']>;

export default function PropertiesComponent({ elementInstance }: Props) {
    const { updateElement } = useDesigner();

    const element = elementInstance as CustomInstance;
    const form = useForm<PropertiesType>({
        defaultValues: element.extraAttributes,
        resolver: zodResolver(propertiesSchema),
        mode: 'onBlur'
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [form, element]);

    function submit(data: PropertiesType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: { text: data.text }
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
                    name="text"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <FormComponents.FormLabel>Text</FormComponents.FormLabel>
                            <FormComponents.FormControl>
                                <Textarea
                                    {...field}
                                    rows={5}
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
