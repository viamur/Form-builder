import { FaEye, FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { MdCancelScheduleSend } from 'react-icons/md';
import StatsCard from '@/components/stats-cards/StatsCard';
import { cn } from '@/lib/utils';

type StatsCardsProps = {
    visits?: number;
    submissions?: number;
    submissionRate?: number;
    bounceRate?: number;
    isContainer?: boolean;
    loading: boolean;
};

export function StatsCards({
    visits,
    submissions,
    submissionRate,
    bounceRate,
    loading,
    isContainer
}: StatsCardsProps) {
    return (
        <div
            className={cn(
                'w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
                isContainer && 'container'
            )}
        >
            <StatsCard
                title="Total visits"
                icon={<FaEye className="text-blue-600" style={{ margin: 0 }} />}
                helperText="All time form visits"
                value={visits?.toLocaleString() || ''}
                loading={loading}
            />

            <StatsCard
                title="Total submissions"
                icon={<FaWpforms className="text-yellow-600" style={{ margin: 0 }} />}
                helperText="All time form submissions"
                value={submissions?.toLocaleString() || ''}
                loading={loading}
            />

            <StatsCard
                title="Submission rate"
                icon={<HiCursorClick className="text-green-600" style={{ margin: 0 }} />}
                helperText="Visits that result in form submission"
                value={submissionRate?.toLocaleString() + '%' || ''}
                loading={loading}
            />

            <StatsCard
                title="Bounce rate"
                icon={<MdCancelScheduleSend className="text-red-600" style={{ margin: 0 }} />}
                helperText="Visits that leaves without interacting"
                value={bounceRate?.toLocaleString() + '%' || ''}
                loading={loading}
            />
        </div>
    );
}
