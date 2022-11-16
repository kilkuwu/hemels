import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

export default function Play({ questions }) {
  return <div>Play</div>;
}

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
}> = async (ctx) => {
  const { type } = ctx.query;
  let questions = [];
  if (type == "random") {
    const { n, tags } = ctx.query;
    const res = await fetch(
      "http://localhost:3000/api/question/generate?" +
        new URLSearchParams({
          type: type,
          n: String(n),
          tags: String(tags),
        })
    );

    console.log(await res.json());
  }

  return {
    props: {
      query: ctx.query,
      isProtected: true,
    },
  };
};
