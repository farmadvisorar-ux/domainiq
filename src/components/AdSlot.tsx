import { getAdSlotById } from '@/lib/admin-data';
import AdBox from './AdBox';

interface AdSlotProps {
    slotId?: 1 | 2 | 3 | 4;
    variant?: 'billboard' | 'showcase' | 'tile' | 'banner';
    className?: string;
    showPlacementTag?: boolean;
}

export default async function AdSlot({
    slotId = 1,
    variant = 'banner',
    className = '',
    showPlacementTag = true,
}: AdSlotProps) {
    let initialData = null;
    try {
        initialData = await getAdSlotById(slotId);
    } catch {
        // Fall back gracefully
    }

    return (
        <AdBox
            slotId={slotId}
            variant={variant}
            className={className}
            initialData={initialData ?? undefined}
            showPlacementTag={showPlacementTag}
        />
    );
}
