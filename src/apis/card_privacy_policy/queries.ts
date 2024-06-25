import { useQuery } from "@tanstack/react-query";
import { getCardPrivacyPolicy } from ".";

const useGetCardPrivacyPolicyQuery = () =>
  useQuery({
    queryKey: ["get-card-privacy-policy"],
    queryFn: () => getCardPrivacyPolicy(),
  });

export { useGetCardPrivacyPolicyQuery };
