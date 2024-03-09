import EditNameFormBtn from '@/components/buttons/EditNameFormBtn';
import DeleteFormBtn from '@/components/buttons/DeleteFormBtn';
import RefreshBtn from '@/components/form-details/RefreshBtn';
import VisitFormBtn from '@/components/form-details/VisitFormBtn';
import FormLinkShare from '@/components/form-details/FormLinkShare';
import { StatsCards } from '@/components/stats-cards/StatsCards';
import SubmittedFormsTable from '@/components/form-submit/SubmittedFormsTable';
import React from 'react';
import { GetFormById } from '@/actions/server-actions';

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
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between container">
                    <div className="flex items-center gap-1">
                        <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                        <EditNameFormBtn formId={form.id} formName={form.name} />
                    </div>
                    <div className="flex items-center gap-2">
                        <DeleteFormBtn formId={form.id} />
                        <RefreshBtn />
                        <VisitFormBtn shareURL={form.shareURL} />
                    </div>
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <FormLinkShare shareURL={form.shareURL} />
            </div>
            <StatsCards
                isContainer
                visits={visits}
                submissions={submissions}
                submissionRate={submissionRate}
                bounceRate={bounceRate}
                loading={false}
            />
            <div className="container py-10">
                <SubmittedFormsTable id={form.id} />
            </div>
        </>
    )
}
