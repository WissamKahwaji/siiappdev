import { useQuery } from "@tanstack/react-query";
import { getInfoHelp } from ".";

const useGetInfoHelpQuery = () =>
  useQuery({
    queryKey: ["get-info-help"],
    queryFn: () => getInfoHelp(),
  });

export { useGetInfoHelpQuery };
