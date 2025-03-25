'use client'

import { useConcertsItems } from '@/hooks/useConcertsItems';
import styles from './concertBanner.module.scss'
import { sortByDate } from '@/lib/date/format-date';
import { Loader } from 'lucide-react';
import { ConcertItem } from './ConcertItem';

export function ConcertsBanner() {
    const { items = [], isLoading } = useConcertsItems();

    const filtered = sortByDate( items.filter((_, i) => i < 5) );

    return (
        <div className={styles.concertBanner_container}>
            <div className={styles.concertBanner_content}>
                <h1>Концерты</h1>
                <hr/>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ul className="tour-list">
                        {filtered.map((item: any, i: number) => (
                            <ConcertItem {...item} i={i} key={i} />
                        ))}
                    </ul>
                )}
                {/* <Link to="/tour" className="button-more">
                    Все концерты
                </Link> */}
            </div>
        </div>
    )
}