'use client'

import ScrollAnimation from 'react-animate-on-scroll'
import { formatDate } from "@/lib/date/format-date";
import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import styles from './concertBanner.module.scss'

export function ConcertItem({ date, city, i }: { date: string; city: string; i: number }) {
    return (
        <li>
            <ScrollAnimation
                className={styles.concertBanner_item}
                animateIn="fadeInLeft"
                animateOut="fadeOutRight"
                delay={i * 100}
                offset={150}
            >
                <div>{formatDate(date)}</div>
                <div>{city}</div>
                <Button >    {/* TODO: Заменить на ссылку на страницу концерта */}
                    <p>Билеты</p>
                    <ArrowRight />
                </Button>
            </ScrollAnimation>
            <hr />
        </li>
    );
};
