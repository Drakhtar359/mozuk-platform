import styles from './StatCard.module.css';

interface StatCardProps {
    title: string;
    value: number;
    icon: string;
    trend?: string;
    color: string;
    prefix?: string;
}

export default function StatCard({ title, value, icon, trend, color, prefix = '' }: StatCardProps) {
    return (
        <div className={styles.card} style={{ '--card-color': color } as React.CSSProperties}>
            <div className={styles.header}>
                <span className={styles.icon}>{icon}</span>
                {trend && (
                    <span className={styles.trend}>
                        {trend}
                    </span>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.value}>
                    {prefix}{typeof value === 'number' && value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                </h3>
                <p className={styles.title}>{title}</p>
            </div>
            <div className={styles.glow}></div>
        </div>
    );
}
