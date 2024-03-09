import { StatsCards } from '@/components/stats-cards/StatsCards';
import FormLinkShare from './components/FormLinkShare';
import SubmittedFormsTable from '@/views/form-details/components/table/SubmittedFormsTable';
import React from 'react';
import { GetFormById } from '@/actions/server-actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import FormDetailsHeader from '@/views/form-details/components/FormDetailsHeader';

type Form = NonNullable<Awaited<ReturnType<typeof GetFormById>>>;

type Props = {
    form: Form;
}

export default function FormDetails({ form }: Props) {
    const { visits, submissions } = form;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return (
        <>
            <FormDetailsHeader formId={form.id} formName={form.name} formShareURL={form.shareURL} />
            <FormLinkShare shareURL={form.shareURL} />

            <ScrollArea type="auto">
                <StatsCards
                    isContainer
                    visits={visits}
                    submissions={submissions}
                    submissionRate={submissionRate}
                    bounceRate={bounceRate}
                    loading={false}
                />
                <SubmittedFormsTable id={form.id} />
            </ScrollArea>
        </>
    )
}
