import { GetFormStats } from '@/actions/form';
import { FaEye, FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { MdCancelScheduleSend } from 'react-icons/md';
import StatsCard from '@/components/stats-cards/StatsCard';

type StatsCardsProps = {
    data?: Awaited<ReturnType<typeof GetFormStats>>;
    loading: boolean;
}

export function StatsCards(props: StatsCardsProps) {
    const { data, loading } = props;

    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total visits"
                icon={<FaEye className="text-blue-600" style={{margin: 0}} />}
                helperText="All time form visits"
                value={data?.visits.toLocaleString() || ''}
                loading={loading}
            />

            <StatsCard
                title="Total submissions"
                icon={<FaWpforms className="text-yellow-600" style={{margin: 0}} />}
                helperText="All time form submissions"
                value={data?.submissions.toLocaleString() || ''}
                loading={loading}
            />

            <StatsCard
                title="Submission rate"
                icon={<HiCursorClick className="text-green-600" style={{margin: 0}} />}
                helperText="Visits that result in form submission"
                value={data?.submissionRate.toLocaleString() + '%' || ''}
                loading={loading}
            />

            <StatsCard
                title="Bounce rate"
                icon={<MdCancelScheduleSend className="text-red-600" style={{margin: 0}} />}
                helperText="Visits that leaves without interacting"
                value={data?.submissionRate.toLocaleString() + '%' || ''}
                loading={loading}
            />
        </div>
    );
}
