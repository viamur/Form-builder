import { GetFormStats } from '@/actions/server-actions';
import { StatsCards } from '@/components/stats-cards/StatsCards';

async function StatsCardsWrapper() {
    const stats = await GetFormStats();
    return (
        <StatsCards
            loading={false}
            visits={stats.visits}
            submissions={stats.submissions}
            submissionRate={stats.submissionRate}
            bounceRate={stats.bounceRate}
        />
    );
}

export default StatsCardsWrapper;
