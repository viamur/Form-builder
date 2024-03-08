import { GetFormById } from '@/actions/form';
import React from 'react';
import VisitBtn from '@/components/form-details/VisitBtn';
import StatsCard from '@/components/stats-cards/StatsCard';
import { FaEye, FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { MdCancelScheduleSend } from 'react-icons/md';
import FormLinkShare from '@/components/form-details/FormLinkShare';
import SubmissionsTable from '@/components/form-submit/SubmissionsTable';
import { notFound } from 'next/navigation';
import DeleteFormBtn from '@/components/form-builder/buttons/DeleteFormBtn';
import RefreshBtn from '@/components/form-details/RefreshBtn';

type BuilderPageProps = {
    params: {
        id: string;
    };
};

async function FormDetailsPage({ params }: BuilderPageProps) {
    const form = await GetFormById(Number(params.id));
    if (!form) {
        notFound();
    }

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
                    <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                    <div className="flex items-center gap-2">
                        <DeleteFormBtn formId={form.id} />
                        <RefreshBtn />
                        <VisitBtn shareURL={form.shareURL} />
                    </div>
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex gap-2 items-center justify-between">
                    <FormLinkShare shareURL={form.shareURL} />
                </div>
            </div>
            <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
                <StatsCard
                    title="Total visits"
                    icon={<FaEye className="text-blue-600" style={{ margin: 0 }} />}
                    helperText="All time form visits"
                    value={visits.toLocaleString() || ''}
                    loading={false}
                />

                <StatsCard
                    title="Total submissions"
                    icon={<FaWpforms className="text-yellow-600" style={{ margin: 0 }} />}
                    helperText="All time form submissions"
                    value={submissions.toLocaleString() || ''}
                    loading={false}
                />

                <StatsCard
                    title="Submission rate"
                    icon={<HiCursorClick className="text-green-600" style={{ margin: 0 }} />}
                    helperText="Visits that result in form submission"
                    value={submissionRate.toLocaleString() + '%' || ''}
                    loading={false}
                />

                <StatsCard
                    title="Bounce rate"
                    icon={<MdCancelScheduleSend className="text-red-600" style={{ margin: 0 }} />}
                    helperText="Visits that leaves without interacting"
                    value={bounceRate.toLocaleString() + '%' || ''}
                    loading={false}
                />
            </div>
            <div className="container py-10">
                <SubmissionsTable id={form.id} />
            </div>
        </>
    );
}

export default FormDetailsPage;
