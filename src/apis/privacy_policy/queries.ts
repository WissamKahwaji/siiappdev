import { useQuery } from "@tanstack/react-query";
import { getPrivacyPolicy } from ".";

const useGetPrivacyPolicyQuery = () =>
  useQuery({
    queryKey: ["get-privacy-policy"],
    queryFn: () => getPrivacyPolicy(),
  });

export { useGetPrivacyPolicyQuery };
