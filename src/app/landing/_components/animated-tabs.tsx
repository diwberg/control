"use client";

import { Tabs } from "@/components/ui/aceternity/tabs";
import Image from "next/image";

export function TabsControl() {
  const tabs = [
    {
      title: "Controle",
      value: "account",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-lime-400 to-emerald-900">
          <p>Contas</p>
          <DummyContent src="/accounts.png" />
        </div>
      ),
    },
    {
      title: "Categorias",
      value: "categories",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-lime-400 to-emerald-900">
          <p>Categorias</p>
          <DummyContent src="/categories.png"/>
        </div>
      ),
    },
    {
      title: "Transações",
      value: "transactions",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-lime-400 to-emerald-900">
          <p>Transações</p>
          <DummyContent src="/transactions.png"/>
        </div>
      ),
    },

  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-20">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = ({ src }: {src: string}) => {
  return (
    <Image
      src={src}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
