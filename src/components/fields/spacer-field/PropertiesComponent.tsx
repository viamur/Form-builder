import { FormElement } from '@/components/fields/FormElements';
import { CustomInstance } from './SpacerField';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps, useEffect } from 'react';
import useBuilderFormContext from '@/hooks/useBuilderFormContext';
import * as FormComponents from '../../ui/form';
import { Slider } from '@/components/ui/slider';

export const propertiesSchema = z.object({
    height: z.number().min(5).max(200)
});

type PropertiesType = z.infer<typeof propertiesSchema>;

type Props = ComponentProps<FormElement['propertiesComponent']>;

export default function PropertiesComponent({ elementInstance }: Props) {
    const { updateElement } = useBuilderFormContext();

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
        const { height } = data;
        updateElement(element.id, {
            ...element,
            extraAttributes: { height }
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
                    name="height"
                    render={({ field }) => (
                        <FormComponents.FormItem>
                            <FormComponents.FormLabel>
                                {`Height: ${field.value}px`}
                            </FormComponents.FormLabel>
                            <FormComponents.FormControl className="pt-2">
                                <Slider
                                    defaultValue={[field.value]}
                                    onValueChange={(value) => {
                                        field.onChange(value[0]);
                                    }}
                                    min={5}
                                    max={200}
                                    step={1}
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
