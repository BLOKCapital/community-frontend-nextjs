import { useRouter } from "next/router";

const Questions = () => {
  const router = useRouter();
  const { questions } = router.query;

  return <div>{questions}</div>;
};

export default Questions;
