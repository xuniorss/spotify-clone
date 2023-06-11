import { Header } from '@/components/Header'
import { ListItem } from '@/components/ListItem'

export default function Home() {
   return (
      <main className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
         <Header>
            <div className="mb-2">
               <h1 className="text-3xl font-semibold text-white">
                  Bem-vindo(a) de volta
               </h1>
               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  <ListItem
                     image="/images/liked.png"
                     name="Músicas Curtidas"
                     href="liked"
                  />
               </div>
            </div>
         </Header>
         <div className="mb-7 mt-2 px-6">
            <div className="flex items-center justify-between">
               <h1 className="text-2xl font-semibold text-white">
                  Músicas mais recentes
               </h1>
            </div>
            <div>Lista de musicas!</div>
         </div>
      </main>
   )
}
