import Image from "next/image";
type Stat = 
  {
    title:string;
    value:number;
  }

const stats: Stat[] = [
  {
    title:"Total Applications",
    value: 12,
  },
  {
    title:"interviews",
    value: 5,
  },
  {
    title:"Offers",
    value: 2,
  },
]
export default function Home() {
  return (
    <main className= "min-h-screen bg-zinc-950 text-white">
      <aside className="w-64 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold">
          Job tracker
        </h1>
        <nav className="mt-10 space-y-4 text-zinc-400">
          <p className="text-white">Dashboard</p>
          <p>Applications</p>
          <p>Analytics</p>
        </nav>
      </aside>
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>
        <p className="mt-2 text-zinc-400">
          Track and manage your job applications.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {stats.map((stat)=>(
            <div
            key={stat.title}
            className="rounded-xl border-zinc-800 bg-zinc-900 p-5"
            >
              <p className="text-sm text-zinc-400">
                {stat.title}
              </p>
              <p className="mt-2 text-3xl font-bold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
