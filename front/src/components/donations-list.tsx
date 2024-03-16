import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    items: Array<{
        commit: string;
        dateTime: string;
        date: string;
        projectName: string;
        branch: string;
        user: {
            name: string;
            imageUrl: string;
        };
    }>;
}

export function DonationList({ items, className }: Props) {
    const classes = cn('divide-y divide-gray-100', className);
    return (
        <ul
            role="list"
            className={classes}
        >
            {items.map((item) => (
                <li
                    key={item.commit}
                    className="p-4"
                >
                    <div className="flex items-center gap-x-3">
                        <img
                            src={item.user.imageUrl}
                            alt=""
                            className="h-6 w-6 flex-none rounded-full bg-gray-800"
                        />
                        <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">
                            {item.user.name}
                        </h3>
                        <time
                            dateTime={item.dateTime}
                            className="flex-none text-xs text-gray-500"
                        >
                            {item.date}
                        </time>
                    </div>
                    <p className="mt-3 truncate text-sm text-gray-500">
                        Made a donation{' '}
                        <span className="text-gray-700">
                            {item.projectName}
                        </span>{' '}
                    </p>
                </li>
            ))}
        </ul>
    );
}
