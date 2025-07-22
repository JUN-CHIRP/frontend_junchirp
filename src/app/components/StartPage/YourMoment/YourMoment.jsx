import stylesShared from '@/app/components/StartPage/startPage.module.scss';
import styles from '@/app/components/StartPage/YourMoment/yourMoment.module.scss';

export default function YourMoment() {
  return (
    <section className={`${stylesShared.section} ${styles.sectionOverride}`}>
      YourMoment
    </section>
  );
}
