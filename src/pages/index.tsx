import Head from 'next/head';
import { Header } from './components/Header';

import { Board } from './components/Board';

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage - GW.Organizer</title>
      </Head>
      <Header />
      <Board />
    </>
  )
}
