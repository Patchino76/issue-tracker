import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const LoadingDetailPage = () => {

  return (
    <Box className="max-w-xl">
        <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width={"5rem"}/>
        <Skeleton width={"8rem"}/>
      </Flex>
      <Card>
        <Skeleton count={3}/>
      </Card>
    </Box>
  );
};

export default LoadingDetailPage;
