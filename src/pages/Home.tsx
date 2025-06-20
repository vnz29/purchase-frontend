import AddDialog from "@/components/common/AddDialog";

import { TableDemo } from "@/components/common/Table";
import { useQuery } from "@tanstack/react-query";
import { getCurrentPurchases } from "@/api/purchase";

function Home() {
  const { data } = useQuery({
    queryKey: ["current-purchases"],
    queryFn: () => getCurrentPurchases(),
    staleTime: 0,
  });

  //Adding all the digits
  console.log("✅ useQuery is running with id:");
  console.log(data);
  return (
    <div style={{ background: "red" }}>
      <div className="text-right">
        <AddDialog />
      </div>
      <TableDemo datas={data?.item} />
    </div>
  );
}

export default Home;
