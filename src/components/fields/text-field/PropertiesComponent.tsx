import { FormElement } from '@/components/fields/FormElements';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps, useEffect } from 'react';
import useBuilderFormContext from '@/hooks/useBuilderFormContext';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CustomInstance } from './TextField';
import * as FormComponents from '../../ui/form';

export const propertiesSchema = z.object({
    label      : z.string().min(2).max(50),
    helperText : z.string().max(200),
    required   : z.boolean().default(false),
    placeholder: z.string().max(50)
});

type PropertiesType = z.infer<typeof propertiesSchema>;

type Props = ComponentProps<FormElement['propertiesComponent']>;

export default function PropertiesComponent({ elementInstance }: Props) {
    const { updateElement } = useBuilderFormContext();

    const element = elementInstance as CustomInstance;
    const form = useForm<PropertiesType>({
        defaultValues: element.extraAttributes,
        resolver     : zodResolver(propertiesSchema),
        mode         : 'onBlur'
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [form, element]);

    function submit(data: PropertiesType) {
        const { label, placeholder, required, helperText } = data;
        updateElement(element.id, {
            ...element,
            extraAttributes: { label, helperText, required, placeholder }
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
                    name="label"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <FormComponents.FormLabel>Label</FormComponents.FormLabel>
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
                            <FormComponents.FormDescription>
                                The label of the field. <br /> It will be displayed above the field.
                            </FormComponents.FormDescription>
                            <FormComponents.FormMessage />
                        </FormComponents.FormItem>
                    )}
                />

                <FormComponents.FormField
                    control={form.control}
                    name="placeholder"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <FormComponents.FormLabel>Placeholder</FormComponents.FormLabel>
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
                            <FormComponents.FormDescription>
                                The placeholder of the field.
                            </FormComponents.FormDescription>
                            <FormComponents.FormMessage />
                        </FormComponents.FormItem>
                    )}
                />

                <FormComponents.FormField
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <FormComponents.FormLabel>Helper text</FormComponents.FormLabel>
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
                            <FormComponents.FormDescription>
                                The helper text of the field. <br />
                                It will be displayed below the field.
                            </FormComponents.FormDescription>
                            <FormComponents.FormMessage />
                        </FormComponents.FormItem>
                    )}
                />

                <FormComponents.FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormComponents.FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <FormComponents.FormLabel>Required</FormComponents.FormLabel>
                                <FormComponents.FormDescription>
                                    The helper for validation of the field.
                                </FormComponents.FormDescription>
                            </div>
                            <FormComponents.FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormComponents.FormControl>
                            <FormComponents.FormMessage />
                        </FormComponents.FormItem>
                    )}
                />
            </form>
        </FormComponents.Form>
    );
}
