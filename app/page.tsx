import Banner from "@/components/Banner";
import CustomJewelry from "@/components/CustomJewelry";
import ExploreMore from "@/components/ExploreMore";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Banner />
      <CustomJewelry />
      <WhyChoose />
      <ExploreMore />
    </main>
  );
}
