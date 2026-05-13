import { redirect } from 'next/navigation';

// Default landing — redirect to sample report
export default function Home() {
  redirect('/reports/australia-cold-chain-market-2022-2027');
}
