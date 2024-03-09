import { ComponentProps, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormElement } from '@/components/form-builder/designer/FormElements';
import { zodResolver } from '@hookform/resolvers/zod';
import useDesigner from '@/hooks/useDesigner';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { CustomInstance } from './TextAreaField';
import * as FormComponents from '../../ui/form';

export const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().max(50),
    rows: z.number().min(1).max(10)
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
        const { label, placeholder, required, helperText, rows } = data;
        updateElement(element.id, {
            ...element,
            extraAttributes: { label, helperText, required, placeholder, rows }
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
                    name="rows"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <FormComponents.FormLabel>{`Rows ${field.value}`}</FormComponents.FormLabel>
                            <FormComponents.FormControl>
                                <Slider
                                    defaultValue={[field.value]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={(value) => {
                                        field.onChange(value[0]);
                                    }}
                                />
                            </FormComponents.FormControl>
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
