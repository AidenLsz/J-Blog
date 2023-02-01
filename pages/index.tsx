import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.scss'
import {GetServerSideProps, NextPage} from 'next'
import BusinessCard, {BusinessCardData} from '@/components/BusinessCard/BusinessCard'
import axios from "axios";

export interface IHomeProps {
    BusinessCardData: BusinessCardData[]
}

const Home: NextPage<IHomeProps> = (BusinessCardData) => {
    return (
        <>
            <BusinessCard {...BusinessCardData}/>
            <div className={styles.test}>首页</div>
            <div className={styles.test}>首页</div>
            <div className={styles.test}>首页</div>
            <div className={styles.test}>首页</div>
            <div className={styles.test}>首页</div>
            <div className={styles.test}>首页</div>
            <div className={styles.test}>首页</div>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async context => {
    const res = await axios.get("http://localhost:3000/api/BusinessCardData")
    return {
        props: res.data
    }
}

export default Home
