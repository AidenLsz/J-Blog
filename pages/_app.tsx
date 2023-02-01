import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import App, {AppContext} from 'next/app'
import Layout from '@/layout'
import Head from 'next/head'
import axios from 'axios'
import {LanguageContextProvider} from '@/stores/language'
import {ThemeContextProvider} from '@/stores/theme'
import {UserAgentProvider} from '@/stores/userAgent'
import {INavBarProps} from '@/components/NavBar/NavBar'
import '@fortawesome/fontawesome-free/css/all.min.css'

const MyApp = (data: AppProps & INavBarProps): JSX.Element => {
    const {Component, pageProps, NavData} = data
    return (
        <div>
            <Head>
                <title>{`A Demo for 《SSR 实战：官网开发指南》`}</title>
                <meta
                    name="description"
                    content={`A Demo for 《SSR 实战：官网开发指南》`}
                />
                <meta name="viewport" content="user-scalable=no"/>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <LanguageContextProvider>
                <ThemeContextProvider>
                    <UserAgentProvider>
                        <Layout NavData={NavData}>
                            <Component {...pageProps} />
                        </Layout>
                    </UserAgentProvider>
                </ThemeContextProvider>
            </LanguageContextProvider>
        </div>
    )
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppProps> => {
    const pageProps = await App.getInitialProps(context)
    const data = await axios.get('http://localhost:3000/api/NavData')
    // console.log(data)
    return Object.assign({}, pageProps, data.data)
}

export default MyApp
