import { GetFormStats } from '@/actions/form';
import { StatsCards } from '@/components/stats-cards/StatsCards';

async function StatsCardsWrapper() {
    const stats = await GetFormStats();
    return <StatsCards loading={false} data={stats} />;
}

export default StatsCardsWrapper;
