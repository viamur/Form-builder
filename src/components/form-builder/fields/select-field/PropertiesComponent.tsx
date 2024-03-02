import { FormElement } from '@/components/form-builder/designer/FormElements';
import { CustomInstance } from './SelectField';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps, useEffect } from 'react';
import useDesigner from '@/hooks/useDesigner';
import * as FormComponents from '../../../ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { toast } from '@/components/ui/use-toast';

export const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().max(50),
    options: z.array(z.string()).default([])
});

type PropertiesType = z.infer<typeof propertiesSchema>;

type Props = ComponentProps<FormElement['propertiesComponent']>;

export default function PropertiesComponent({ elementInstance }: Props) {
    const { updateElement, setSelectedElement } = useDesigner();

    const element = elementInstance as CustomInstance;
    const form = useForm<PropertiesType>({
        defaultValues: element.extraAttributes,
        resolver: zodResolver(propertiesSchema),
        mode: 'onSubmit'
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [form, element]);

    function submit(data: PropertiesType) {
        const { label, placeholder, required, helperText, options } = data;
        updateElement(element.id, {
            ...element,
            extraAttributes: { label, helperText, required, placeholder, options }
        });

        toast({
            title: 'Success',
            description: 'Properties saved successfully',
        })

        setSelectedElement(null);
    }

    return (
        <FormComponents.Form {...form}>
            <form
                className="space-y-3"
                onSubmit={form.handleSubmit(submit)}
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

                <Separator />

                <FormComponents.FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <div className="flex justify-between items-center">
                                <FormComponents.FormLabel>Options</FormComponents.FormLabel>
                                <Button
                                    variant="outline"
                                    className="gap-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        form.setValue('options', field.value.concat('New option'))
                                    }}
                                >
                                    <AiOutlinePlus />
                                    Add
                                </Button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {field.value.map((option, index) => (
                                    <div key={index} className="flex items-center justify-between gap-1">
                                        <Input
                                            value={option}
                                            onChange={(e) => {
                                                field.value[index] = e.target.value;
                                                field.onChange(field.value);
                                            }}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newOptions = [...field.value];
                                                newOptions.splice(index, 1);
                                                field.onChange(newOptions);
                                            }}
                                        >
                                            <AiOutlineClose />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <FormComponents.FormDescription>
                                The helper text of the field. <br />
                                It will be displayed below the field.
                            </FormComponents.FormDescription>
                            <FormComponents.FormMessage />
                        </FormComponents.FormItem>
                    )}
                />
                <Separator />
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
                <Separator />
                <Button className="w-full" type="submit">
                    Save
                </Button>
            </form>
        </FormComponents.Form>
    );
}
