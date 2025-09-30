import AddDialog from "@/components/common/AddDialog";

import { TableDemo } from "@/components/common/Table";
import { useQuery } from "@tanstack/react-query";
import { getCurrentPurchases } from "@/api/purchase";
import Components from "@/components/common/Components";

function Home() {
  const { data } = useQuery({
    queryKey: ["current-purchases"],
    queryFn: () => getCurrentPurchases(),
    staleTime: 0,
  });

  return (
    <div>
      <div className="text-right">
        <AddDialog />
      </div>
      <TableDemo datas={data?.item} type={"home"} />
    </div>
  );
}

export default Home;
